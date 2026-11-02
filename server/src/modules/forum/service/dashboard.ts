import { BaseService } from '@cool-midway/core';
import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { ForumPointLogEntity } from '../entity/pointLog';
import { ForumUserEntity } from '../entity/user';

/**
 * 积分消费数据看板（积分消费体系 2.7，只读聚合）。
 *
 * 口径红线（设计文档 4.7）：
 * - `transfer` 是后台人工调账，一律排除在发行/回收之外；
 * - 赞赏 / 悬赏是**零和流转**（tip_in 伴随 tip_out、bounty_in 伴随 bounty_out/refund），
 *   把它们混进「发行 vs 回收」会把同一笔积分两头都算进回收，必须单列；
 * - 发行 = 收入侧（checkin/post/comment/liked 的 delta>0）；
 * - 回收 = 真实消费（shop/makeup/rename/quota 的 delta<0）。
 *
 * 全部直连 PG 只读聚合，不涉及任何账务写。
 */
@Provide()
export class ForumDashboardService extends BaseService {
  @InjectEntityModel(ForumPointLogEntity)
  pointLogEntity: Repository<ForumPointLogEntity>;

  @InjectEntityModel(ForumUserEntity)
  userEntity: Repository<ForumUserEntity>;

  /** 真实消费类型（销毁型出口，进回收口径） */
  private readonly CONSUME_TYPES = ['shop', 'makeup', 'rename', 'quota'];

  /** 收入侧类型（进发行口径） */
  private readonly INCOME_TYPES = ['checkin', 'post', 'comment', 'liked'];

  /**
   * 看板总览：一次性返回全部指标。
   * 前端按需渲染卡片 / 图表。
   */
  async getOverview(): Promise<{
    recycle: { issued: number; consumed: number; recycleRate: number | null };
    byType: { type: string; amount: number; count: number; percent: number }[];
    tipFlow: { totalIn: number; totalOut: number; count: number };
    bountyFlow: { escrow: number; settled: number; refunded: number; totalAmount: number; feeTotal: number };
    renewal: { purchasers: number; renewals: number };
    penetration: { active: number; consumed: number; rate: number | null };
  }> {
    const [recycle, byTypeRows, tipFlow, bountyFlow, renewal, penetration] = await Promise.all([
      this.queryRecycle(),
      this.queryByType(),
      this.queryTipFlow(),
      this.queryBountyFlow(),
      this.queryRenewal(),
      this.queryPenetration(),
    ]);
    return { recycle, byType: byTypeRows, tipFlow, bountyFlow, renewal, penetration };
  }

  /** 发行 vs 回收（核心指标） */
  private async queryRecycle() {
    const [row] = await this.pointLogEntity.query(
      `SELECT
         SUM(CASE WHEN delta > 0 THEN delta ELSE 0 END) AS issued,
         SUM(CASE WHEN delta < 0 AND type = ANY($1) THEN -delta ELSE 0 END) AS consumed
       FROM point_logs
       WHERE type NOT IN ('transfer')`,
      [this.CONSUME_TYPES],
    );
    const issued = Number(row?.issued ?? 0);
    const consumed = Number(row?.consumed ?? 0);
    return {
      issued,
      consumed,
      recycleRate: issued > 0 ? Number((consumed / issued).toFixed(4)) : null,
    };
  }

  /** 各出口消费占比（真实消费按 type 分组，不含赞赏/悬赏流转） */
  private async queryByType() {
    const rows: { type: string; amount: string; count: string }[] = await this.pointLogEntity.query(
      `SELECT type, SUM(-delta) AS amount, COUNT(*) AS count
       FROM point_logs
       WHERE delta < 0 AND type = ANY($1)
       GROUP BY type
       ORDER BY amount DESC`,
      [this.CONSUME_TYPES],
    );
    const total = rows.reduce((s, r) => s + Number(r.amount ?? 0), 0);
    return rows.map((r) => ({
      type: r.type,
      amount: Number(r.amount ?? 0),
      count: Number(r.count ?? 0),
      percent: total > 0 ? Number(((Number(r.amount ?? 0) / total) * 100).toFixed(1)) : 0,
    }));
  }

  /** 赞赏流转（零和：总进 = 总出，单独展示流动规模，不进回收率） */
  private async queryTipFlow() {
    const [row] = await this.pointLogEntity.query(
      `SELECT
         COALESCE(SUM(CASE WHEN type = 'tip_in' THEN delta ELSE 0 END), 0) AS totalIn,
         COALESCE(SUM(CASE WHEN type = 'tip_out' THEN -delta ELSE 0 END), 0) AS totalOut,
         COUNT(DISTINCT CASE WHEN type IN ('tip_in', 'tip_out') THEN "refId" END) AS count
       FROM point_logs
       WHERE type IN ('tip_in', 'tip_out')`,
    );
    return {
      totalIn: Number(row?.totalIn ?? 0),
      totalOut: Number(row?.totalOut ?? 0),
      count: Number(row?.count ?? 0),
    };
  }

  /** 悬赏流转（amount/payout/fee 对账：settled 行 amount − payout = fee） */
  private async queryBountyFlow() {
    const [row] = await this.pointLogEntity.query(
      `SELECT
         COALESCE(SUM(CASE WHEN status = 'escrow' THEN 1 ELSE 0 END), 0) AS escrow,
         COALESCE(SUM(CASE WHEN status = 'settled' THEN 1 ELSE 0 END), 0) AS settled,
         COALESCE(SUM(CASE WHEN status = 'refunded' THEN 1 ELSE 0 END), 0) AS refunded,
         COALESCE(SUM(amount), 0) AS totalAmount,
         COALESCE(SUM(fee), 0) AS feeTotal
       FROM bounties`,
    );
    return {
      escrow: Number(row?.escrow ?? 0),
      settled: Number(row?.settled ?? 0),
      refunded: Number(row?.refunded ?? 0),
      totalAmount: Number(row?.totalAmount ?? 0),
      feeTotal: Number(row?.feeTotal ?? 0),
    };
  }

  /** 装饰续费：购买了同一商品（refId）≥2 次的用户数 / 商城购买用户数 */
  private async queryRenewal() {
    const [renewalRow] = await this.pointLogEntity.query(
      `SELECT COUNT(*) AS renewals FROM (
         SELECT "userId" FROM point_logs
         WHERE type = 'shop' AND delta < 0 AND "refId" IS NOT NULL
         GROUP BY "userId", "refId"
         HAVING COUNT(*) >= 2
       ) t`,
    );
    const [purchaserRow] = await this.pointLogEntity.query(
      `SELECT COUNT(DISTINCT "userId") AS purchasers FROM point_logs
       WHERE type = 'shop' AND delta < 0`,
    );
    return {
      purchasers: Number(purchaserRow?.purchasers ?? 0),
      renewals: Number(renewalRow?.renewals ?? 0),
    };
  }

  /** 消费渗透率：参与过消费的用户 / 有过收入侧积分的活跃用户（校验「攒 → 花」心智） */
  private async queryPenetration() {
    const [activeRow] = await this.pointLogEntity.query(
      `SELECT COUNT(DISTINCT "userId") AS active FROM point_logs
       WHERE delta > 0 AND type = ANY($1)`,
      [this.INCOME_TYPES],
    );
    const [consumedRow] = await this.userEntity.query(
      `SELECT COUNT(*) AS consumed FROM users u
       WHERE EXISTS (
         SELECT 1 FROM point_logs pl
         WHERE pl."userId" = u.id AND pl.delta < 0 AND pl.type = ANY($1)
       )`,
      [this.CONSUME_TYPES],
    );
    const active = Number(activeRow?.active ?? 0);
    const consumed = Number(consumedRow?.consumed ?? 0);
    return {
      active,
      consumed,
      rate: active > 0 ? Number(((consumed / active) * 100).toFixed(1)) : null,
    };
  }
}
