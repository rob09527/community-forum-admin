declare namespace Eps {
	interface BaseSysDepartmentEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 部门名称
		 */
		name?: string;

		/**
		 * 创建者ID
		 */
		userId?: number;

		/**
		 * 上级部门ID
		 */
		parentId?: number;

		/**
		 * 排序
		 */
		orderNum?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysLogEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户ID
		 */
		userId?: number;

		/**
		 * 行为
		 */
		action?: string;

		/**
		 * ip
		 */
		ip?: string;

		/**
		 * 参数
		 */
		params?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 姓名
		 */
		name?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysMenuEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 父菜单ID
		 */
		parentId?: number;

		/**
		 * 菜单名称
		 */
		name?: string;

		/**
		 * 菜单地址
		 */
		router?: string;

		/**
		 * 权限标识
		 */
		perms?: string;

		/**
		 * 类型 0-目录 1-菜单 2-按钮
		 */
		type?: number;

		/**
		 * 图标
		 */
		icon?: string;

		/**
		 * 排序
		 */
		orderNum?: number;

		/**
		 * 视图地址
		 */
		viewPath?: string;

		/**
		 * 路由缓存
		 */
		keepAlive?: boolean;

		/**
		 * 是否显示
		 */
		isShow?: boolean;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysParamEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 键
		 */
		keyName?: string;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * 数据
		 */
		data?: string;

		/**
		 * 数据类型 0-字符串 1-富文本 2-文件
		 */
		dataType?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysRoleEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户ID
		 */
		userId?: string;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * 角色标签
		 */
		label?: string;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 数据权限是否关联上下级
		 */
		relevance?: boolean;

		/**
		 * 菜单权限
		 */
		menuIdList?: any;

		/**
		 * 部门权限
		 */
		departmentIdList?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysUserEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 部门ID
		 */
		departmentId?: number;

		/**
		 * 创建者ID
		 */
		userId?: number;

		/**
		 * 姓名
		 */
		name?: string;

		/**
		 * 用户名
		 */
		username?: string;

		/**
		 * 密码
		 */
		password?: string;

		/**
		 * 密码版本, 作用是改完密码，让原来的token失效
		 */
		passwordV?: number;

		/**
		 * 昵称
		 */
		nickName?: string;

		/**
		 * 头像
		 */
		headImg?: string;

		/**
		 * 手机
		 */
		phone?: string;

		/**
		 * 邮箱
		 */
		email?: string;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;

		/**
		 * socketId
		 */
		socketId?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DemoGoodsEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 标题
		 */
		title?: string;

		/**
		 * 价格
		 */
		price?: number;

		/**
		 * 描述
		 */
		description?: string;

		/**
		 * 主图
		 */
		mainImage?: string;

		/**
		 * 分类
		 */
		type?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 示例图
		 */
		exampleImages?: any;

		/**
		 * 库存
		 */
		stock?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 昵称
		 */
		userName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 类型ID
		 */
		typeId?: number;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * 值
		 */
		value?: string;

		/**
		 * 排序
		 */
		orderNum?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 父ID
		 */
		parentId?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictTypeEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * 标识
		 */
		key?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ForumAdvertEntity {
		/**
		 * 广告 ID
		 */
		id?: number;

		/**
		 * 广告标题（后台识别 + img alt），可空
		 */
		title?: string;

		/**
		 * banner 图片 URL（后台 cl-upload 返回的完整 URL）
		 */
		image?: string;

		/**
		 * 广告位置 sidebar/inline
		 */
		position?: string;

		/**
		 * 跳转链接（站内路径或外链），可空
		 */
		link?: string;

		/**
		 * 排序权重，越大越靠前
		 */
		sortOrder?: number;

		/**
		 * 是否上线
		 */
		isActive?: boolean;

		/**
		 * 创建时间
		 */
		createdAt?: timestamp;

		/**
		 * 最后更新时间
		 */
		updatedAt?: timestamp;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ForumAnnouncementEntity {
		/**
		 * 公告 ID
		 */
		id?: number;

		/**
		 * 公告标题
		 */
		title?: string;

		/**
		 * 公告类型 normal/important/urgent/activity
		 */
		type?: string;

		/**
		 * 跳转链接（站内路径或外链），可空
		 */
		link?: string;

		/**
		 * 排序权重，越大越靠前
		 */
		sortOrder?: number;

		/**
		 * 是否上线
		 */
		isActive?: boolean;

		/**
		 * 创建时间
		 */
		createdAt?: timestamp;

		/**
		 * 最后更新时间
		 */
		updatedAt?: timestamp;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ForumBountyEntity {
		/**
		 * 悬赏 ID
		 */
		id?: number;

		/**
		 * 悬赏帖 ID。裸 ID 不建外键；一帖一悬赏故唯一
		 */
		postId?: number;

		/**
		 * 发起人 ID
		 */
		userId?: number;

		/**
		 * 托管金额。发起时已从发起人余额一次性扣除，不落在任何用户账户，仅记账
		 */
		amount?: number;

		/**
		 * 状态：escrow(托管中) | settled(已采纳) | refunded(已退款)
		 */
		status?: string;

		/**
		 * 超时时间 = 发起时刻 + 配置天数（默认 7）。定时结算的判定依据
		 */
		expireAt?: timestamp;

		/**
		 * 被采纳的回答评论 ID（结算快照），事后被删不影响已结算
		 */
		acceptedCommentId?: number;

		/**
		 * 被采纳的回答者 ID（结算快照）
		 */
		acceptedUserId?: number;

		/**
		 * 实发金额 = amount − fee；退款时为 null
		 */
		payout?: number;

		/**
		 * 手续费（销毁，计入悬赏账目）；退款不扣手续费，故退款时为 null
		 */
		fee?: number;

		/**
		 * 结算方式：accept(人工采纳) | auto(超时自动判给最高赞) | cancel(发起人取消) | admin(后台人工退款)
		 */
		settleType?: string;

		/**
		 * 结算时间；未结算为 null
		 */
		settledAt?: timestamp;

		/**
		 * 后台人工退款的操作者用户名（审计追责）
		 */
		operator?: string;

		/**
		 * 创建时间
		 */
		createdAt?: timestamp;

		/**
		 * 用户名
		 */
		userName?: string;

		/**
		 * 用户名
		 */
		acceptedUserName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ForumCategoryEntity {
		/**
		 * 分类 ID
		 */
		id?: number;

		/**
		 * 板块 slug，对应 posts.category 字段值
		 */
		slug?: string;

		/**
		 * 板块中文名
		 */
		name?: string;

		/**
		 * 板块 emoji 图标
		 */
		icon?: string;

		/**
		 * 排序权重，越小越靠前
		 */
		sortOrder?: number;

		/**
		 * 是否启用（禁用后从 /api/categories 隐藏、发帖不可选）
		 */
		isEnabled?: boolean;

		/**
		 * 创建时间
		 */
		createdAt?: timestamp;

		/**
		 * 最后更新时间
		 */
		updatedAt?: timestamp;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ForumUserDecorationEntity {
		/**
		 * 持有记录 ID
		 */
		id?: number;

		/**
		 * 持有用户 ID
		 */
		userId?: number;

		/**
		 * 商品 ID；续费需要跳回商品，故商品禁删只能下架
		 */
		itemId?: number;

		/**
		 * 装饰类型（冗余自 ShopItem.type：username_color | title）
		 */
		type?: string;

		/**
		 * 购买时快照的渲染值 —— 商品事后改价/改值/下架不回溯已购用户
		 */
		renderValue?: string;

		/**
		 * 购买时快照的样式 key（称号徽章配色），颜色类为 null
		 */
		renderStyle?: string;

		/**
		 * 实付价格快照（后台客诉排查「我当时花了多少」）
		 */
		price?: number;

		/**
		 * 本次生效起始时间
		 */
		startAt?: timestamp;

		/**
		 * 到期时间；过期记录不删除，置灰展示 + 一键续费
		 */
		expireAt?: timestamp;

		/**
		 * 到期通知已发送的时间；null 表示未发（幂等标记）
		 */
		expiredNotifiedAt?: timestamp;

		/**
		 * 创建时间
		 */
		createdAt?: timestamp;

		/**
		 * 最后更新时间
		 */
		updatedAt?: timestamp;

		/**
		 * 用户名
		 */
		userName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ForumNotificationEntity {
		/**
		 * 通知 ID
		 */
		id?: number;

		/**
		 * 接收者用户 ID
		 */
		userId?: number;

		/**
		 * 类型 comment/reply/like/follow/system
		 */
		type?: string;

		/**
		 * 触发者 ID 列表（只存最近 3 个）
		 */
		actorIds?: number;

		/**
		 * 触发者总数（聚合累计事件数）
		 */
		actorCount?: number;

		/**
		 * 关联帖子 ID，可跳转
		 */
		postId?: number;

		/**
		 * 关联评论 ID
		 */
		commentId?: number;

		/**
		 * 群发消息 ID，正文存于 notification_messages 表
		 */
		messageId?: number;

		/**
		 * 系统通知正文，仅 system 有；新群发经 messageId 解析，存量行仍在本列
		 */
		content?: string;

		/**
		 * 是否已读
		 */
		isRead?: boolean;

		/**
		 * 通知时间
		 */
		createdAt?: timestamp;

		/**
		 * 用户名
		 */
		userName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ForumPointLogEntity {
		/**
		 * 流水 ID
		 */
		id?: number;

		/**
		 * 用户 ID
		 */
		userId?: number;

		/**
		 * 积分来源 checkin/post/comment/liked/transfer
		 */
		type?: string;

		/**
		 * 变动值，正数加分，transfer 管理调整可为负
		 */
		delta?: number;

		/**
		 * 变动后的鸡腿余额
		 */
		balanceAfter?: number;

		/**
		 * 关联的帖子/评论 ID，无关联为 null
		 */
		refId?: number;

		/**
		 * 操作者（管理调整 transfer 时是哪个管理员），非 transfer 为 null
		 */
		operator?: string;

		/**
		 * 变动时间
		 */
		createdAt?: timestamp;

		/**
		 * 用户名
		 */
		userName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ForumPostEntity {
		/**
		 * 帖子 ID
		 */
		id?: number;

		/**
		 * 帖子标题
		 */
		title?: string;

		/**
		 * Markdown 正文
		 */
		content?: string;

		/**
		 * 板块 slug（DB 驱动，见 categories 表，勿在此处硬编码清单）
		 */
		category?: string;

		/**
		 * 标签列表
		 */
		tags?: string;

		/**
		 * 作者 ID
		 */
		authorId?: number;

		/**
		 * 浏览量
		 */
		viewCount?: number;

		/**
		 * 点赞数
		 */
		likeCount?: number;

		/**
		 * 评论数
		 */
		commentCount?: number;

		/**
		 * 是否置顶
		 */
		isPinned?: boolean;

		/**
		 * 发布时间
		 */
		createdAt?: timestamp;

		/**
		 * 最后更新时间
		 */
		updatedAt?: timestamp;

		/**
		 * 用户名
		 */
		authorName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ForumShopItemEntity {
		/**
		 * 商品 ID
		 */
		id?: number;

		/**
		 * 装饰类型：username_color(用户名颜色) | title(专属称号)，同类互相覆盖、不同类共存
		 */
		type?: string;

		/**
		 * 商品名（前台展示，如「幻紫」）
		 */
		name?: string;

		/**
		 * 渲染值：颜色类为 CSS 色值/渐变；称号类为称号文本。购买时快照到 UserDecoration 与 User 槽位
		 */
		renderValue?: string;

		/**
		 * 附加样式 key（称号徽章配色 amber/violet/emerald），颜色类为 null
		 */
		renderStyle?: string;

		/**
		 * 价格（鸡腿），改价不影响已售出（购买即快照渲染值）
		 */
		price?: number;

		/**
		 * 时效天数（入门色 7 / 精选色与称号 30）
		 */
		durationDays?: number;

		/**
		 * 是否上架；下架后商城隐藏、不可购买，已持有者不受影响
		 */
		isActive?: boolean;

		/**
		 * 排序权重，越小越靠前
		 */
		sortOrder?: number;

		/**
		 * 创建时间
		 */
		createdAt?: timestamp;

		/**
		 * 最后更新时间
		 */
		updatedAt?: timestamp;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ForumTipEntity {
		/**
		 * 赞赏记录 ID
		 */
		id?: number;

		/**
		 * 赞赏者 ID
		 */
		fromUserId?: number;

		/**
		 * 接收者 ID（内容作者）。冗余存储而非 JOIN 内容表取 —— 内容删除后仍能按接收方聚合 [T4]
		 */
		toUserId?: number;

		/**
		 * 赞赏目标类型：post | comment
		 */
		targetType?: string;

		/**
		 * 目标 ID。裸 ID 不建外键，与 PointLog.refId 同口径；内容删除后本行保留
		 */
		targetId?: number;

		/**
		 * 赞赏金额（鸡腿）；不扣手续费，全额到账 [R47]
		 */
		amount?: number;

		/**
		 * 赞赏留言，最长 20 字，选填 [1.5.3]
		 */
		message?: string;

		/**
		 * 赞赏时间
		 */
		createdAt?: timestamp;

		/**
		 * 用户名
		 */
		fromUserName?: string;

		/**
		 * 用户名
		 */
		toUserName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ForumUserEntity {
		/**
		 * 用户 ID
		 */
		id?: number;

		/**
		 * 用户名
		 */
		username?: string;

		/**
		 * 邮箱
		 */
		email?: string;

		/**
		 * 头像 URL
		 */
		avatar?: string;

		/**
		 * 个人简介
		 */
		bio?: string;

		/**
		 * 等级 claw/leg/meat
		 */
		level?: string;

		/**
		 * 鸡腿积分
		 */
		points?: number;

		/**
		 * 星辰
		 */
		stars?: number;

		/**
		 * 发帖数
		 */
		postCount?: number;

		/**
		 * 评论数
		 */
		commentCount?: number;

		/**
		 * 粉丝数（冗余，关注/取关时同步增减）
		 */
		followerCount?: number;

		/**
		 * 关注数（冗余）
		 */
		followingCount?: number;

		/**
		 * 角色 user/mod/admin
		 */
		role?: string;

		/**
		 * 状态 active/banned/muted
		 */
		status?: string;

		/**
		 * 第三方登录来源
		 */
		oauthProvider?: string;

		/**
		 * 邮箱是否已验证
		 */
		emailVerified?: boolean;

		/**
		 * 累计上传字节数
		 */
		uploadSize?: number;

		/**
		 * 累计鸡腿（只增不减）
		 */
		totalPointsEarned?: number;

		/**
		 * 连续签到天数
		 */
		checkinStreak?: number;

		/**
		 * 累计签到天数
		 */
		checkinTotalDays?: number;

		/**
		 * 上次签到时间
		 */
		lastCheckinAt?: timestamp;

		/**
		 * 是否导入生成的影子用户
		 */
		isShadow?: boolean;

		/**
		 * 注册时间
		 */
		createdAt?: timestamp;

		/**
		 * 最后更新时间
		 */
		updatedAt?: timestamp;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface PluginInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * 简介
		 */
		description?: string;

		/**
		 * Key名
		 */
		keyName?: string;

		/**
		 * Hook
		 */
		hook?: string;

		/**
		 * 描述
		 */
		readme?: string;

		/**
		 * 版本
		 */
		version?: string;

		/**
		 * Logo(base64)
		 */
		logo?: string;

		/**
		 * 作者
		 */
		author?: string;

		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;

		/**
		 * 内容
		 */
		content?: any;

		/**
		 * ts内容
		 */
		tsContent?: any;

		/**
		 * 插件的plugin.json
		 */
		pluginJson?: any;

		/**
		 * 配置
		 */
		config?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface RecycleDataEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 表
		 */
		entityInfo?: any;

		/**
		 * 操作人
		 */
		userId?: number;

		/**
		 * 被删除的数据
		 */
		data?: any;

		/**
		 * 请求的接口
		 */
		url?: string;

		/**
		 * 请求参数
		 */
		params?: any;

		/**
		 * 删除数据条数
		 */
		count?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 姓名
		 */
		userName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 地址
		 */
		url?: string;

		/**
		 * 类型
		 */
		type?: string;

		/**
		 * 分类ID
		 */
		classifyId?: number;

		/**
		 * 文件id
		 */
		fileId?: string;

		/**
		 * 文件名
		 */
		name?: string;

		/**
		 * 文件大小
		 */
		size?: number;

		/**
		 * 文档版本
		 */
		version?: number;

		/**
		 * 文件位置
		 */
		key?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceTypeEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 类别名称
		 */
		name?: string;

		/**
		 * 父分类ID
		 */
		parentId?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface TaskInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 任务ID
		 */
		jobId?: string;

		/**
		 * 任务配置
		 */
		repeatConf?: string;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * cron
		 */
		cron?: string;

		/**
		 * 最大执行次数 不传为无限次
		 */
		limit?: number;

		/**
		 * 每间隔多少毫秒执行一次 如果cron设置了 这项设置就无效
		 */
		every?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 状态 0-停止 1-运行
		 */
		status?: number;

		/**
		 * 开始时间
		 */
		startDate?: Date;

		/**
		 * 结束时间
		 */
		endDate?: Date;

		/**
		 * 数据
		 */
		data?: string;

		/**
		 * 执行的service实例ID
		 */
		service?: string;

		/**
		 * 状态 0-系统 1-用户
		 */
		type?: number;

		/**
		 * 下一次执行时间
		 */
		nextRunTime?: Date;

		/**
		 * 状态 0-cron 1-时间间隔
		 */
		taskType?: number;

		/**
		 * undefined
		 */
		lastExecuteTime?: Date;

		/**
		 * undefined
		 */
		lockExpireTime?: Date;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserAddressEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户ID
		 */
		userId?: number;

		/**
		 * 联系人
		 */
		contact?: string;

		/**
		 * 手机号
		 */
		phone?: string;

		/**
		 * 省
		 */
		province?: string;

		/**
		 * 市
		 */
		city?: string;

		/**
		 * 区
		 */
		district?: string;

		/**
		 * 地址
		 */
		address?: string;

		/**
		 * 是否默认
		 */
		isDefault?: boolean;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 登录唯一ID
		 */
		unionid?: string;

		/**
		 * 头像
		 */
		avatarUrl?: string;

		/**
		 * 昵称
		 */
		nickName?: string;

		/**
		 * 手机号
		 */
		phone?: string;

		/**
		 * 性别
		 */
		gender?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 登录方式
		 */
		loginType?: number;

		/**
		 * 密码
		 */
		password?: string;

		/**
		 * 介绍
		 */
		description?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	type json = any;

	interface PagePagination {
		size: number;
		page: number;
		total: number;
		[key: string]: any;
	}

	interface PageResponse<T> {
		pagination: PagePagination;
		list: T[];
		[key: string]: any;
	}

	interface BaseSysLogPageResponse {
		pagination: PagePagination;
		list: BaseSysLogEntity[];
	}

	interface BaseSysMenuPageResponse {
		pagination: PagePagination;
		list: BaseSysMenuEntity[];
	}

	interface BaseSysParamPageResponse {
		pagination: PagePagination;
		list: BaseSysParamEntity[];
	}

	interface BaseSysRolePageResponse {
		pagination: PagePagination;
		list: BaseSysRoleEntity[];
	}

	interface BaseSysUserPageResponse {
		pagination: PagePagination;
		list: BaseSysUserEntity[];
	}

	interface DemoGoodsPageResponse {
		pagination: PagePagination;
		list: DemoGoodsEntity[];
	}

	interface DictInfoPageResponse {
		pagination: PagePagination;
		list: DictInfoEntity[];
	}

	interface DictTypePageResponse {
		pagination: PagePagination;
		list: DictTypeEntity[];
	}

	interface ForumAdvertPageResponse {
		pagination: PagePagination;
		list: ForumAdvertEntity[];
	}

	interface ForumAnnouncementPageResponse {
		pagination: PagePagination;
		list: ForumAnnouncementEntity[];
	}

	interface ForumBountyPageResponse {
		pagination: PagePagination;
		list: ForumBountyEntity[];
	}

	interface ForumCategoryPageResponse {
		pagination: PagePagination;
		list: ForumCategoryEntity[];
	}

	interface ForumDecorationPageResponse {
		pagination: PagePagination;
		list: ForumUserDecorationEntity[];
	}

	interface ForumNotificationPageResponse {
		pagination: PagePagination;
		list: ForumNotificationEntity[];
	}

	interface ForumPointLogPageResponse {
		pagination: PagePagination;
		list: ForumPointLogEntity[];
	}

	interface ForumPostPageResponse {
		pagination: PagePagination;
		list: ForumPostEntity[];
	}

	interface ForumTipPageResponse {
		pagination: PagePagination;
		list: ForumTipEntity[];
	}

	interface ForumUserPageResponse {
		pagination: PagePagination;
		list: ForumUserEntity[];
	}

	interface PluginInfoPageResponse {
		pagination: PagePagination;
		list: PluginInfoEntity[];
	}

	interface RecycleDataPageResponse {
		pagination: PagePagination;
		list: RecycleDataEntity[];
	}

	interface SpaceInfoPageResponse {
		pagination: PagePagination;
		list: SpaceInfoEntity[];
	}

	interface SpaceTypePageResponse {
		pagination: PagePagination;
		list: SpaceTypeEntity[];
	}

	interface TaskInfoPageResponse {
		pagination: PagePagination;
		list: TaskInfoEntity[];
	}

	interface UserAddressPageResponse {
		pagination: PagePagination;
		list: UserAddressEntity[];
	}

	interface UserInfoPageResponse {
		pagination: PagePagination;
		list: UserInfoEntity[];
	}

	interface BaseCoding {
		/**
		 * 获取模块目录结构
		 */
		getModuleTree(data?: any): Promise<any>;

		/**
		 * 创建代码
		 */
		createCode(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { getModuleTree: string; createCode: string };

		/**
		 * 权限状态
		 */
		_permission: { getModuleTree: boolean; createCode: boolean };

		request: Request;
	}

	interface BaseComm {
		/**
		 * 修改个人信息
		 */
		personUpdate(data?: any): Promise<any>;

		/**
		 * 文件上传模式
		 */
		uploadMode(data?: any): Promise<any>;

		/**
		 * 权限与菜单
		 */
		permmenu(data?: any): Promise<any>;

		/**
		 * 编程
		 */
		program(data?: any): Promise<any>;

		/**
		 * 个人信息
		 */
		person(data?: any): Promise<any>;

		/**
		 * 文件上传
		 */
		upload(data?: any): Promise<any>;

		/**
		 * 退出
		 */
		logout(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			personUpdate: string;
			uploadMode: string;
			permmenu: string;
			program: string;
			person: string;
			upload: string;
			logout: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			personUpdate: boolean;
			uploadMode: boolean;
			permmenu: boolean;
			program: boolean;
			person: boolean;
			upload: boolean;
			logout: boolean;
		};

		request: Request;
	}

	interface BaseOpen {
		/**
		 * 刷新token
		 */
		refreshToken(data?: any): Promise<any>;

		/**
		 * 验证码
		 */
		captcha(data?: any): Promise<any>;

		/**
		 * 登录
		 */
		login(data?: any): Promise<any>;

		/**
		 * 获得网页内容的参数值
		 */
		html(data?: any): Promise<any>;

		/**
		 * 实体信息与路径
		 */
		eps(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			refreshToken: string;
			captcha: string;
			login: string;
			html: string;
			eps: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			refreshToken: boolean;
			captcha: boolean;
			login: boolean;
			html: boolean;
			eps: boolean;
		};

		request: Request;
	}

	interface BaseSysDepartment {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 排序
		 */
		order(data?: any): Promise<any>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysDepartmentEntity[]>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { delete: string; update: string; order: string; list: string; add: string };

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			order: boolean;
			list: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface BaseSysLog {
		/**
		 * 日志保存时间
		 */
		setKeep(data?: any): Promise<any>;

		/**
		 * 获得日志保存时间
		 */
		getKeep(data?: any): Promise<any>;

		/**
		 * 清理
		 */
		clear(data?: any): Promise<any>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<BaseSysLogPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { setKeep: string; getKeep: string; clear: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { setKeep: boolean; getKeep: boolean; clear: boolean; page: boolean };

		request: Request;
	}

	interface BaseSysMenu {
		/**
		 * 创建代码
		 */
		create(data?: any): Promise<any>;

		/**
		 * 导出
		 */
		export(data?: any): Promise<any>;

		/**
		 * 导入
		 */
		import(data?: any): Promise<any>;

		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 解析
		 */
		parse(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysMenuEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysMenuEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<BaseSysMenuPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			create: string;
			export: string;
			import: string;
			delete: string;
			update: string;
			parse: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			create: boolean;
			export: boolean;
			import: boolean;
			delete: boolean;
			update: boolean;
			parse: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface BaseSysParam {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 获得网页内容的参数值
		 */
		html(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysParamEntity>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<BaseSysParamPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			html: string;
			info: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			html: boolean;
			info: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface BaseSysRole {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysRoleEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysRoleEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<BaseSysRolePageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface BaseSysUser {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 移动部门
		 */
		move(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysUserEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysUserEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<BaseSysUserPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			move: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			move: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface DemoGoods {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DemoGoodsEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DemoGoodsEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<DemoGoodsPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface DemoTenant {
		/**
		 * 局部不使用多租户
		 */
		noTenant(data?: any): Promise<any>;

		/**
		 * 不使用多租户
		 */
		noUse(data?: any): Promise<any>;

		/**
		 * use
		 */
		use(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { noTenant: string; noUse: string; use: string };

		/**
		 * 权限状态
		 */
		_permission: { noTenant: boolean; noUse: boolean; use: boolean };

		request: Request;
	}

	interface DictInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 获得所有字典类型
		 */
		types(data?: any): Promise<any>;

		/**
		 * 获得字典数据
		 */
		data(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DictInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DictInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<DictInfoPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			types: string;
			data: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			types: boolean;
			data: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface DictType {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DictTypeEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DictTypeEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<DictTypePageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface ForumAdvert {
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<ForumAdvertPageResponse>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<ForumAdvertEntity[]>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ForumAdvertEntity>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			update: string;
			delete: string;
			page: string;
			list: string;
			info: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			update: boolean;
			delete: boolean;
			page: boolean;
			list: boolean;
			info: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface ForumAnnouncement {
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<ForumAnnouncementPageResponse>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<ForumAnnouncementEntity[]>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ForumAnnouncementEntity>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			update: string;
			delete: string;
			page: string;
			list: string;
			info: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			update: boolean;
			delete: boolean;
			page: boolean;
			list: boolean;
			info: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface ForumBounty {
		/**
		 * 悬赏人工退款
		 */
		refund(data?: any): Promise<any>;

		/**
		 * 立即结算到期悬赏
		 */
		sweep(data?: any): Promise<any>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<ForumBountyPageResponse>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ForumBountyEntity>;

		/**
		 * 权限标识
		 */
		permission: { refund: string; sweep: string; page: string; info: string };

		/**
		 * 权限状态
		 */
		_permission: { refund: boolean; sweep: boolean; page: boolean; info: boolean };

		request: Request;
	}

	interface ForumCategory {
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<ForumCategoryPageResponse>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<ForumCategoryEntity[]>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ForumCategoryEntity>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			update: string;
			delete: string;
			page: string;
			list: string;
			info: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			update: boolean;
			delete: boolean;
			page: boolean;
			list: boolean;
			info: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface ForumConfig {
		/**
		 * 保存签到奖励配置
		 */
		saveCheckin(data?: any): Promise<any>;

		/**
		 * 保存等级配置
		 */
		saveLevels(data?: any): Promise<any>;

		/**
		 * 保存悬赏配置
		 */
		saveBounty(data?: any): Promise<any>;

		/**
		 * 保存频率/体积限制配置
		 */
		saveLimits(data?: any): Promise<any>;

		/**
		 * 读取全部配置（签到/等级/商城/赞赏/悬赏/道具/限流）
		 */
		getConfig(data?: any): Promise<any>;

		/**
		 * 保存功能道具配置
		 */
		saveProps(data?: any): Promise<any>;

		/**
		 * 保存商城配置
		 */
		saveShop(data?: any): Promise<any>;

		/**
		 * 保存赞赏配置
		 */
		saveTip(data?: any): Promise<any>;

		/**
		 * 恢复某组消费配置为默认（删 Redis key）
		 */
		reset(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			saveCheckin: string;
			saveLevels: string;
			saveBounty: string;
			saveLimits: string;
			getConfig: string;
			saveProps: string;
			saveShop: string;
			saveTip: string;
			reset: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			saveCheckin: boolean;
			saveLevels: boolean;
			saveBounty: boolean;
			saveLimits: boolean;
			getConfig: boolean;
			saveProps: boolean;
			saveShop: boolean;
			saveTip: boolean;
			reset: boolean;
		};

		request: Request;
	}

	interface ForumDashboard {
		/**
		 * 积分消费看板总览
		 */
		getOverview(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { getOverview: string };

		/**
		 * 权限状态
		 */
		_permission: { getOverview: boolean };

		request: Request;
	}

	interface ForumDecoration {
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<ForumDecorationPageResponse>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ForumUserDecorationEntity>;

		/**
		 * 权限标识
		 */
		permission: { page: string; info: string };

		/**
		 * 权限状态
		 */
		_permission: { page: boolean; info: boolean };

		request: Request;
	}

	interface ForumNodeloc {
		/**
		 * 启停同步 worker 开关（热切换，body: { syncEnabled }）
		 */
		setSyncEnabled(data?: any): Promise<any>;

		/**
		 * 单主题重灌（body: { topicId }，幂等）
		 */
		reimportTopic(data?: any): Promise<any>;

		/**
		 * 读取导入概览（阶段/游标/映射量/影子规模）
		 */
		getOverview(data?: any): Promise<any>;

		/**
		 * 重建帖子搜索索引（回填完成后执行）
		 */
		reindex(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			setSyncEnabled: string;
			reimportTopic: string;
			getOverview: string;
			reindex: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			setSyncEnabled: boolean;
			reimportTopic: boolean;
			getOverview: boolean;
			reindex: boolean;
		};

		request: Request;
	}

	interface ForumNotification {
		/**
		 * 群发系统通知
		 */
		broadcast(data?: any): Promise<any>;

		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<ForumNotificationPageResponse>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ForumNotificationEntity>;

		/**
		 * 权限标识
		 */
		permission: { broadcast: string; delete: string; page: string; info: string };

		/**
		 * 权限状态
		 */
		_permission: { broadcast: boolean; delete: boolean; page: boolean; info: boolean };

		request: Request;
	}

	interface ForumPointLog {
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<ForumPointLogPageResponse>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ForumPointLogEntity>;

		/**
		 * 权限标识
		 */
		permission: { page: string; info: string };

		/**
		 * 权限状态
		 */
		_permission: { page: boolean; info: boolean };

		request: Request;
	}

	interface ForumPost {
		/**
		 * 删除帖子
		 */
		deletePost(data?: any): Promise<any>;

		/**
		 * 置顶/取消置顶
		 */
		togglePin(data?: any): Promise<any>;

		/**
		 * 帖子评论树
		 */
		comments(data?: any): Promise<any>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<ForumPostPageResponse>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ForumPostEntity>;

		/**
		 * 权限标识
		 */
		permission: {
			deletePost: string;
			togglePin: string;
			comments: string;
			page: string;
			info: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			deletePost: boolean;
			togglePin: boolean;
			comments: boolean;
			page: boolean;
			info: boolean;
		};

		request: Request;
	}

	interface ForumShopItem {
		/**
		 * 读取装饰商品目录
		 */
		catalog(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 同步商品目录
		 */
		sync(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { catalog: string; update: string; sync: string };

		/**
		 * 权限状态
		 */
		_permission: { catalog: boolean; update: boolean; sync: boolean };

		request: Request;
	}

	interface ForumTip {
		/**
		 * 赞赏按接收方聚合
		 */
		aggregateByReceiver(data?: any): Promise<any>;

		/**
		 * 赞赏按发送方聚合
		 */
		aggregateBySender(data?: any): Promise<any>;

		/**
		 * 赞赏同方同收对预警
		 */
		aggregateByPair(data?: any): Promise<any>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<ForumTipPageResponse>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ForumTipEntity>;

		/**
		 * 权限标识
		 */
		permission: {
			aggregateByReceiver: string;
			aggregateBySender: string;
			aggregateByPair: string;
			page: string;
			info: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			aggregateByReceiver: boolean;
			aggregateBySender: boolean;
			aggregateByPair: boolean;
			page: boolean;
			info: boolean;
		};

		request: Request;
	}

	interface ForumUser {
		/**
		 * 重置密码
		 */
		resetPassword(data?: any): Promise<any>;

		/**
		 * 封禁/解封/禁言
		 */
		changeStatus(data?: any): Promise<any>;

		/**
		 * 调整积分
		 */
		adjustPoints(data?: any): Promise<any>;

		/**
		 * 修改角色
		 */
		changeRole(data?: any): Promise<any>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<ForumUserPageResponse>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ForumUserEntity>;

		/**
		 * 权限标识
		 */
		permission: {
			resetPassword: string;
			changeStatus: string;
			adjustPoints: string;
			changeRole: string;
			page: string;
			info: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			resetPassword: boolean;
			changeStatus: boolean;
			adjustPoints: boolean;
			changeRole: boolean;
			page: boolean;
			info: boolean;
		};

		request: Request;
	}

	interface PluginInfo {
		/**
		 * 安装插件
		 */
		install(data?: any): Promise<any>;

		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<PluginInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<PluginInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<PluginInfoPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			install: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			install: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface RecycleData {
		/**
		 * 恢复数据
		 */
		restore(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<RecycleDataEntity>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<RecycleDataPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { restore: string; info: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { restore: boolean; info: boolean; page: boolean };

		request: Request;
	}

	interface SpaceInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SpaceInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SpaceInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<SpaceInfoPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface SpaceType {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SpaceTypeEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SpaceTypeEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<SpaceTypePageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface TaskInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 开始
		 */
		start(data?: any): Promise<any>;

		/**
		 * 执行一次
		 */
		once(data?: any): Promise<any>;

		/**
		 * 停止
		 */
		stop(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<TaskInfoEntity>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<TaskInfoPageResponse>;

		/**
		 * 日志
		 */
		log(data?: any): Promise<any>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			start: string;
			once: string;
			stop: string;
			info: string;
			page: string;
			log: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			start: boolean;
			once: boolean;
			stop: boolean;
			info: boolean;
			page: boolean;
			log: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface UserAddress {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<UserAddressEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<UserAddressEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<UserAddressPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface UserInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<UserInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<UserInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<UserInfoPageResponse>;

		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface RequestOptions {
		url: string;
		method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
		data?: any;
		params?: any;
		headers?: any;
		timeout?: number;
		[key: string]: any;
	}

	type Request = (options: RequestOptions) => Promise<any>;

	type DictKey = "brand" | "occupation";

	type Service = {
		request: Request;

		base: {
			coding: BaseCoding;
			comm: BaseComm;
			open: BaseOpen;
			sys: {
				department: BaseSysDepartment;
				log: BaseSysLog;
				menu: BaseSysMenu;
				param: BaseSysParam;
				role: BaseSysRole;
				user: BaseSysUser;
			};
		};
		demo: { goods: DemoGoods; tenant: DemoTenant };
		dict: { info: DictInfo; type: DictType };
		forum: {
			advert: ForumAdvert;
			announcement: ForumAnnouncement;
			bounty: ForumBounty;
			category: ForumCategory;
			config: ForumConfig;
			dashboard: ForumDashboard;
			decoration: ForumDecoration;
			nodeloc: ForumNodeloc;
			notification: ForumNotification;
			pointLog: ForumPointLog;
			post: ForumPost;
			shopItem: ForumShopItem;
			tip: ForumTip;
			user: ForumUser;
		};
		plugin: { info: PluginInfo };
		recycle: { data: RecycleData };
		space: { info: SpaceInfo; type: SpaceType };
		task: { info: TaskInfo };
		user: { address: UserAddress; info: UserInfo };
	};
}
