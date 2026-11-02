import { BaseService } from '@cool-midway/core';
import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { ForumTipEntity } from '../entity/tip';

/**
 * 赞赏记录服务（积分消费体系 2.5）。
 * 读（page/list/info）继承 BaseService 查 PG；
 * 三种聚合是排查小号搬运 / 异常流动的第一入口，均为只读 GROUP BY 原生查询。
 *
 * 对账口径提醒：赞赏是零和流转（tip_out 在发送方、tip_in 在接收方），
 * 聚合只看流动方向，不进「发行 vs 回收」口径（见 dashboard service）。
 */
@Provide()
export class ForumTipService extends BaseService {
  @InjectEntityModel(ForumTipEntity)
  forumTipEntity: Repository<ForumTipEntity>;

  /**
   * 按发送方聚合：同一人向多少人赞赏、多少笔、总额多少 —— 排查小号搬运 [2.5]。
   * @param minTotal 阈值：发送方累计赞赏金额 ≥ 该值才展示（默认 100）
   */
  async aggregateBySender(query: any): Promise<{ items: any[] }> {
    const { minTotal = 100, startTime, endTime } = query || {};
    const items = await this.forumTipEntity.query(
      `SELECT t."fromUserId" AS id, u.username,
              COUNT(DISTINCT t."toUserId") AS "receiverCount",
              COUNT(*) AS "tipCount",
              SUM(t.amount) AS "totalAmount"
       FROM tips t
       JOIN users u ON u.id = t."fromUserId"
       WHERE ($2::timestamp IS NULL OR t."createdAt" >= $2)
         AND ($3::timestamp IS NULL OR t."createdAt" <= $3)
       GROUP BY t."fromUserId", u.username
       HAVING SUM(t.amount) >= $1
       ORDER BY "totalAmount" DESC
       LIMIT 50`,
      [this.numOr(minTotal, 100), this.dateOrNull(startTime), this.dateOrNull(endTime)],
    );
    return { items };
  }

  /**
   * 按接收方聚合：同一人收到多少赞赏、多少笔、总额多少 —— 排查异常流入。
   */
  async aggregateByReceiver(query: any): Promise<{ items: any[] }> {
    const { minTotal = 100, startTime, endTime } = query || {};
    const items = await this.forumTipEntity.query(
      `SELECT t."toUserId" AS id, u.username,
              COUNT(DISTINCT t."fromUserId") AS "senderCount",
              COUNT(*) AS "tipCount",
              SUM(t.amount) AS "totalAmount"
       FROM tips t
       JOIN users u ON u.id = t."toUserId"
       WHERE ($2::timestamp IS NULL OR t."createdAt" >= $2)
         AND ($3::timestamp IS NULL OR t."createdAt" <= $3)
       GROUP BY t."toUserId", u.username
       HAVING SUM(t.amount) >= $1
       ORDER BY "totalAmount" DESC
       LIMIT 50`,
      [this.numOr(minTotal, 100), this.dateOrNull(startTime), this.dateOrNull(endTime)],
    );
    return { items };
  }

  /**
   * 同一发送方对同一接收方累计赞赏 —— 小号搬运最典型的行为特征
   * （单一通道大额转移），页面顶部预警用 [2.5]。
   */
  async aggregateByPair(query: any): Promise<{ items: any[] }> {
    const { minTotal = 100, startTime, endTime } = query || {};
    const items = await this.forumTipEntity.query(
      `SELECT t."fromUserId" AS "fromUserId", fu.username AS "fromUserName",
              t."toUserId" AS "toUserId", tu.username AS "toUserName",
              COUNT(*) AS "tipCount",
              SUM(t.amount) AS "totalAmount"
       FROM tips t
       JOIN users fu ON fu.id = t."fromUserId"
       JOIN users tu ON tu.id = t."toUserId"
       WHERE ($2::timestamp IS NULL OR t."createdAt" >= $2)
         AND ($3::timestamp IS NULL OR t."createdAt" <= $3)
       GROUP BY t."fromUserId", fu.username, t."toUserId", tu.username
       HAVING SUM(t.amount) >= $1
       ORDER BY "totalAmount" DESC
       LIMIT 50`,
      [this.numOr(minTotal, 100), this.dateOrNull(startTime), this.dateOrNull(endTime)],
    );
    return { items };
  }

  private numOr(v: any, def: number): number {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : def;
  }

  private dateOrNull(v: any): string | null {
    if (!v) return null;
    const d = new Date(v as string);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  }
}
