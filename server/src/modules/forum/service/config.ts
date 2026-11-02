import { Config, Provide } from '@midwayjs/core';
import { CoolCommException } from '@cool-midway/core';
import axios from 'axios';

/**
 * 游戏化配置（签到奖励 / 等级体系 / 消费体系四组）服务。
 *
 * 配置契约（Redis key 名 + zod schema + 默认值）只在 forum server 存一份（服务端单一写入口），
 * 本服务不再直连共享 Redis、不再手抄 key 与校验，统一经 forum server 管理接口读写：
 *   GET    /api/admin/config           读取全部配置组的「已解析生效值」（zod 校验 + 默认兜底后）
 *   PUT    /api/admin/config/:group    写入一组（server 侧按 zod schema 校验，非法回 400）
 *   DELETE /api/admin/config/:group    删除 Redis key → forum 侧回退代码内置默认值
 * 服务间带 X-Admin-Key，错误 message 透传（同 service/bounty.ts 的退款转发模式）。
 */
@Provide()
export class ForumGameConfigService {
  @Config('forum.serverUrl')
  forumServerUrl: string;

  @Config('forum.adminKey')
  forumAdminKey: string;

  /** 调 forum server 管理接口，统一带服务间密钥并解析响应（同 bounty.ts 的 call 同款）。 */
  private async call(method: 'get' | 'put' | 'delete', path: string, body?: unknown) {
    try {
      const { data } = await axios.request({
        method,
        url: `${this.forumServerUrl}${path}`,
        data: body,
        headers: { 'X-Admin-Key': this.forumAdminKey },
        timeout: 5000,
      });
      if (!data?.success) {
        throw new CoolCommException(data?.error?.message || 'forum 接口调用失败');
      }
      return data.data;
    } catch (err) {
      if (err instanceof CoolCommException) throw err;
      // axios 对非 2xx 抛错，把 forum 返回的业务错误 message 透传出来（zod 校验失败文案等）
      const message = err?.response?.data?.error?.message;
      throw new CoolCommException(message || '调用 forum 服务失败，请检查服务是否启动');
    }
  }

  /** 读取当前配置：forum 返回全部组的已解析生效值（checkin/levels/shop/tip/bounty/props/limits），页面据此初始化 */
  async getConfig(): Promise<any> {
    return this.call('get', '/api/admin/config');
  }

  /** 保存签到奖励配置（forum 侧 zod 校验后落 Redis） */
  async saveCheckin(cfg: any): Promise<void> {
    await this.call('put', '/api/admin/config/checkin', cfg);
  }

  /** 保存等级配置 */
  async saveLevels(levels: any): Promise<void> {
    await this.call('put', '/api/admin/config/levels', levels);
  }

  /** 保存商城配置 */
  async saveShop(cfg: any): Promise<void> {
    await this.call('put', '/api/admin/config/shop', cfg);
  }

  /** 保存赞赏配置（档位 / 自定义上下限 / 热度权重等） */
  async saveTip(cfg: any): Promise<void> {
    await this.call('put', '/api/admin/config/tip', cfg);
  }

  /** 保存悬赏配置 */
  async saveBounty(cfg: any): Promise<void> {
    await this.call('put', '/api/admin/config/bounty', cfg);
  }

  /**
   * 保存频率/体积限制配置（第 7 组 config:limits）。
   * ⚠️ 非超管账号调用本方法需要权限点 `forum:config:saveLimits`，而它**还没进 menu.json**
   * （本轮红线不许改 menu.json），未补前非超管会被 authority 中间件拦成 403。详见交接快照 §13.6。
   */
  async saveLimits(cfg: any): Promise<void> {
    await this.call('put', '/api/admin/config/limits', cfg);
  }

  /** 保存功能道具配置 */
  async saveProps(cfg: any): Promise<void> {
    await this.call('put', '/api/admin/config/props', cfg);
  }

  /** 恢复某组配置为默认值：删 Redis key，forum 侧自动回退代码内置默认值。body 形如 { group } */
  async reset(body: any): Promise<void> {
    const group = typeof body === 'string' ? body : body?.group;
    if (!group) throw new CoolCommException('缺少配置组 group');
    await this.call('delete', `/api/admin/config/${group}`);
  }
}
