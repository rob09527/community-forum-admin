import { CoolBaseEntity } from '@cool-midway/core';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 悬赏记录（映射 Prisma 管理的 bounties 表，只读）。
 *
 * 一帖一悬赏（postId 唯一）；状态机（escrow→settled/refunded）所有流转由 forum server
 * 条件更新幂等完成，admin 只读列表 + 人工退款/立即结算转发 forum server（账务写唯一入口）。
 * 裸 ID 不建外键 [T4]：帖/评论被删不影响已结算状态。
 * 表结构由 forum server 的 Prisma 迁移创建，synchronize 必须关闭。
 */
// 表结构由 Prisma 迁移管理，排除 TypeORM 同步
@Entity({ name: 'bounties', synchronize: false })
export class ForumBountyEntity extends CoolBaseEntity {
  @PrimaryGeneratedColumn('increment', { comment: '悬赏 ID' })
  id: number;

  @Column({ type: 'int', comment: '悬赏帖 ID。裸 ID 不建外键；一帖一悬赏故唯一', unique: true })
  postId: number;

  @Column({ type: 'int', comment: '发起人 ID' })
  userId: number;

  @Column({ type: 'int', comment: '托管金额。发起时已从发起人余额一次性扣除，不落在任何用户账户，仅记账' })
  amount: number;

  @Column({ type: 'text', comment: '状态：escrow(托管中) | settled(已采纳) | refunded(已退款)' })
  status: string;

  @Column({ type: 'timestamp', comment: '超时时间 = 发起时刻 + 配置天数（默认 7）。定时结算的判定依据' })
  expireAt: Date;

  @Column({ type: 'int', comment: '被采纳的回答评论 ID（结算快照），事后被删不影响已结算', nullable: true })
  acceptedCommentId: number | null;

  @Column({ type: 'int', comment: '被采纳的回答者 ID（结算快照）', nullable: true })
  acceptedUserId: number | null;

  @Column({ type: 'int', comment: '实发金额 = amount − fee；退款时为 null', nullable: true })
  payout: number | null;

  @Column({ type: 'int', comment: '手续费（销毁，计入悬赏账目）；退款不扣手续费，故退款时为 null', nullable: true })
  fee: number | null;

  @Column({ type: 'text', comment: '结算方式：accept(人工采纳) | auto(超时自动判给最高赞) | cancel(发起人取消) | admin(后台人工退款)', nullable: true })
  settleType: string | null;

  @Column({ type: 'timestamp', comment: '结算时间；未结算为 null', nullable: true })
  settledAt: Date | null;

  @Column({ type: 'text', comment: '后台人工退款的操作者用户名（审计追责）', nullable: true })
  operator: string | null;

  @Column({ type: 'timestamp', comment: '创建时间' })
  createdAt: Date;
}
