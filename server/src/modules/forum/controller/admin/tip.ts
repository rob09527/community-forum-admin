import { CoolController, BaseController } from '@cool-midway/core';
import { Get, Inject, Provide, Query } from '@midwayjs/core';
import { ForumTipEntity } from '../../entity/tip';
import { ForumUserEntity } from '../../entity/user';
import { ForumTipService } from '../../service/tip';

/**
 * 赞赏记录查询（积分消费体系 2.5，只读）。
 * 记录列表 LEFT JOIN users 取赞赏者 / 接收者用户名，支持时间范围、金额区间、目标类型筛选；
 * 三种聚合（按发送方 / 按接收方 / 同方同收对）是排查小号搬运与异常流动的第一入口。
 * 赞赏是零和流转，聚合只展示流动方向，不进「发行 vs 回收」口径。
 *
 * 不开放 `list`：框架的 list() 不加任何 LIMIT，tips 是随业务线性增长的大表，
 * 一次全量返回会打挂单进程的 Midway。前端 view 走 page + cl-pagination，不依赖 list。
 */
@Provide()
@CoolController({
  api: ['page', 'info'],
  entity: ForumTipEntity,
  service: ForumTipService,
  pageQueryOp: {
    select: [
      'a.id',
      'a.fromUserId',
      'a.toUserId',
      'a.targetType',
      'a.targetId',
      'a.amount',
      'a.message',
      'a.createdAt',
      'c.username as "fromUserName"',
      'd.username as "toUserName"',
    ],
    fieldEq: ['a.fromUserId', 'a.toUserId', 'a.targetType'],
    // 关键字模糊搜索（cl-search-key：赞赏者 / 接收者用户名）
    keyWordLikeFields: ['c.username', 'd.username'],
    // 时间范围 + 金额区间过滤（cl-search 的 datetimeRange/inputRange hook 拆分请求参数）
    where: (ctx: any) => {
      const { startCreatedAt, endCreatedAt, minAmount, maxAmount } = ctx?.request?.body || {};
      const wheres: [string, object][] = [];
      if (startCreatedAt) {
        wheres.push(['a."createdAt" >= :startCreatedAt::timestamp', { startCreatedAt }]);
      }
      if (endCreatedAt) {
        wheres.push(['a."createdAt" <= :endCreatedAt::timestamp', { endCreatedAt }]);
      }
      if (minAmount) {
        wheres.push(['a.amount >= :minAmount', { minAmount: Number(minAmount) }]);
      }
      if (maxAmount) {
        wheres.push(['a.amount <= :maxAmount', { maxAmount: Number(maxAmount) }]);
      }
      return wheres;
    },
    join: [
      {
        entity: ForumUserEntity,
        alias: 'c',
        condition: 'a.fromUserId = c.id',
      },
      {
        entity: ForumUserEntity,
        alias: 'd',
        condition: 'a.toUserId = d.id',
      },
    ],
    addOrderBy: { createdAt: 'DESC' },
  },
})
export class AdminForumTipController extends BaseController {
  @Inject()
  forumTipService: ForumTipService;

  /** 按发送方聚合：同一人向多少人赞赏、多少笔、总额（minTotal 阈值默认 100） */
  @Get('/aggregateBySender', { summary: '赞赏按发送方聚合' })
  async aggregateBySender(@Query() params: any) {
    return this.ok(await this.forumTipService.aggregateBySender(params));
  }

  /** 按接收方聚合：同一人收到多少赞赏、多少笔、总额 */
  @Get('/aggregateByReceiver', { summary: '赞赏按接收方聚合' })
  async aggregateByReceiver(@Query() params: any) {
    return this.ok(await this.forumTipService.aggregateByReceiver(params));
  }

  /** 同一发送方对同一接收方累计赞赏（预警：异常偏高即小号搬运最典型特征） */
  @Get('/aggregateByPair', { summary: '赞赏同方同收对预警' })
  async aggregateByPair(@Query() params: any) {
    return this.ok(await this.forumTipService.aggregateByPair(params));
  }
}
