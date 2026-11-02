import { BaseService, CoolCommException } from '@cool-midway/core';
import { Config, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ForumBountyEntity } from '../entity/bounty';

/**
 * 悬赏服务（积分消费体系 2.4）。
 * 读（page/list/info）继承 BaseService 查 PG；
 * 人工退款 / 立即结算是**账务写**，必须转发 forum server（/api/admin/bounties/*），
 * 不能直连 PG 重写 —— 账本一致性只有一个写入口（forum 的事务），见铁律 3。
 */
@Provide()
export class ForumBountyService extends BaseService {
  @InjectEntityModel(ForumBountyEntity)
  forumBountyEntity: Repository<ForumBountyEntity>;

  @Config('forum.serverUrl')
  forumServerUrl: string;

  @Config('forum.adminKey')
  forumAdminKey: string;

  /**
   * 调 forum server 管理写接口，统一带服务间密钥并解析响应。
   * 与 service/user.ts 的 call 同款（bounty 的退款/结算必须走 forum 事务）。
   */
  private async call(path: string, body: Record<string, unknown>) {
    try {
      const { data } = await axios.post(`${this.forumServerUrl}${path}`, body, {
        headers: { 'X-Admin-Key': this.forumAdminKey },
        timeout: 5000,
      });
      if (!data?.success) {
        throw new CoolCommException(data?.error?.message || 'forum 接口调用失败');
      }
      return data.data;
    } catch (err) {
      if (err instanceof CoolCommException) throw err;
      // axios 对非 2xx 抛错，把 forum 返回的业务错误 message 透传出来
      const message = err?.response?.data?.error?.message;
      throw new CoolCommException(message || '调用 forum 服务失败，请检查服务是否启动');
    }
  }

  /**
   * 人工退款（处置异常悬赏：发起人误操作、内容违规下架等）。
   * forum 侧 forceRefund=true，不判定「是否有有效回答」，托管中即可退；
   * 退款不扣手续费，operator 写入 Bounty.operator 审计追责 [2.4]。
   */
  async refund(id: number, operator?: string) {
    return this.call(`/api/admin/bounties/${id}/refund`, operator ? { operator } : {});
  }

  /**
   * 立即结算所有到期悬赏（人工兜底）。
   * 主链路是 forum server 的 60s 调度器（Redis 抢锁），本接口在调度器异常或需要提前结算时手动触发。
   */
  async sweep() {
    return this.call('/api/admin/bounties/sweep', {});
  }
}
