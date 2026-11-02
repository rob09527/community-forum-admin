import { CoolController, BaseController } from '@cool-midway/core';
import { Provide } from '@midwayjs/core';
import { ForumDashboardService } from '../../service/dashboard';

/**
 * 积分消费数据看板（积分消费体系 2.7）。
 * 只读聚合：发行 vs 回收 / 各出口占比 / 赞赏悬赏流转 / 续费笔数 / 消费渗透率。
 * 口径红线：transfer 排除、赞赏悬赏零和流转单列（见 service/dashboard.ts）。
 */
@Provide()
@CoolController({
  serviceApis: [{ method: 'getOverview', summary: '积分消费看板总览' }],
  service: ForumDashboardService,
})
export class AdminForumDashboardController extends BaseController {}
