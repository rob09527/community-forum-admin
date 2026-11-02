import { CoolController, BaseController } from '@cool-midway/core';
import { Provide } from '@midwayjs/core';
import { ForumGameConfigService } from '../../service/config';

/**
 * 论坛游戏化配置管理（签到奖励 / 等级体系 / 消费体系四组）。
 * 读/写经 service 转发 forum server 管理接口（服务端单一写入口，admin 不直连共享 Redis），
 * 配置契约（key/schema/默认值）只在 forum 侧存一份，见 service/config.ts。
 * serviceApis 自动生成路由（前缀按控制器文件名）：/admin/forum/config/{method}，
 * 客户端对应 service.forum.config.{method}，方法接收请求 body。
 */
@Provide()
@CoolController({
  serviceApis: [
    { method: 'getConfig', summary: '读取全部配置（签到/等级/商城/赞赏/悬赏/道具/限流）' },
    { method: 'saveCheckin', summary: '保存签到奖励配置' },
    { method: 'saveLevels', summary: '保存等级配置' },
    { method: 'saveShop', summary: '保存商城配置' },
    { method: 'saveTip', summary: '保存赞赏配置' },
    { method: 'saveBounty', summary: '保存悬赏配置' },
    { method: 'saveProps', summary: '保存功能道具配置' },
    { method: 'saveLimits', summary: '保存频率/体积限制配置' },
    { method: 'reset', summary: '恢复某组消费配置为默认（删 Redis key）' },
  ],
  service: ForumGameConfigService,
})
export class AdminForumGameConfigController extends BaseController {}
