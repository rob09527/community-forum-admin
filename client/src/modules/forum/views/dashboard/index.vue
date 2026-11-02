<template>
	<el-scrollbar>
		<div class="dashboard-page">
		<!-- 核心指标卡 -->
		<el-row :gutter="16" class="stat-row">
			<el-col :xs="12" :md="8" :xl="4">
				<el-card shadow="never">
					<div class="stat-label">发行积分</div>
					<div class="stat-value">{{ fmt(recycle.issued) }}</div>
					<div class="stat-sub">签到/发帖/评论/被点赞 收入</div>
				</el-card>
			</el-col>
			<el-col :xs="12" :md="8" :xl="4">
				<el-card shadow="never">
					<div class="stat-label">回收积分</div>
					<div class="stat-value">{{ fmt(recycle.consumed) }}</div>
					<div class="stat-sub">商城/补签/改名/扩容 消费</div>
				</el-card>
			</el-col>
			<el-col :xs="12" :md="8" :xl="4">
				<el-card shadow="never">
					<div class="stat-label">回收率</div>
					<div class="stat-value">{{ recycle.recycleRate == null ? '—' : (recycle.recycleRate * 100).toFixed(1) + '%' }}</div>
					<div class="stat-sub">回收 / 发行</div>
				</el-card>
			</el-col>
			<el-col :xs="12" :md="8" :xl="4">
				<el-card shadow="never">
					<div class="stat-label">消费渗透率</div>
					<div class="stat-value">{{ penetration.rate == null ? '—' : penetration.rate + '%' }}</div>
					<div class="stat-sub">消费用户 {{ penetration.consumed }} / 活跃用户 {{ penetration.active }}</div>
				</el-card>
			</el-col>
			<el-col :xs="12" :md="8" :xl="4">
				<el-card shadow="never">
					<div class="stat-label">续费</div>
					<div class="stat-value">{{ renewal.renewals }}</div>
					<div class="stat-sub">重复购买用户 {{ renewal.renewals }} / 购买用户 {{ renewal.purchasers }}</div>
				</el-card>
			</el-col>
			<el-col :xs="12" :md="8" :xl="4">
				<el-card shadow="never">
					<div class="stat-label">赞赏流动</div>
					<div class="stat-value">{{ fmt(tipFlow.totalIn) }}</div>
					<div class="stat-sub">流入 {{ fmt(tipFlow.totalIn) }} / 流出 {{ fmt(tipFlow.totalOut) }}（零和）</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- 图表区 -->
		<el-row :gutter="16">
			<el-col :xs="24" :md="12">
				<el-card shadow="never">
					<template #header>
						<span>🏪 各出口消费占比</span>
						<span class="chart-sub">shop/makeup/rename/quota，不含赞赏悬赏流转</span>
					</template>
					<v-chart :option="byTypeOption" autoresize style="height: 320px" />
				</el-card>
			</el-col>
			<el-col :xs="24" :md="12">
				<el-card shadow="never">
					<template #header>
						<span>🎯 悬赏流转状态</span>
						<span class="chart-sub">托管 {{ bountyFlow.escrow }} / 结算 {{ bountyFlow.settled }} / 退款 {{ bountyFlow.refunded }}</span>
					</template>
					<v-chart :option="bountyOption" autoresize style="height: 320px" />
				</el-card>
			</el-col>
		</el-row>

		<el-card v-if="overview" class="mt-3" shadow="never">
			<div class="overview-tips">
				<p>📌 口径说明（积分消费体系 2.7）：<code>transfer</code>（后台人工调账）排除在发行/回收之外；赞赏/悬赏为<b>零和流转</b>（一进一出抵消），单独统计流动规模，不进回收率。</p>
				<p>💰 悬赏金额总额 {{ fmt(bountyFlow.totalAmount) }}，累计手续费 {{ fmt(bountyFlow.feeTotal) }}（settled 行 amount − payout = fee）。</p>
			</div>
		</el-card>
		</div>
	</el-scrollbar>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'forum-dashboard-index'
});

import { onMounted, reactive, ref } from 'vue';
import { useCool } from '/@/cool';

const { service } = useCool();

// 口径：真实消费出口（对齐 dashboard service CONSUME_TYPES）
const TYPE_LABELS: Record<string, string> = {
	shop: '商城',
	makeup: '补签',
	rename: '改名',
	quota: '扩容'
};

const overview = ref<any>(null);
const recycle = reactive({ issued: 0, consumed: 0, recycleRate: null as number | null });
const tipFlow = reactive({ totalIn: 0, totalOut: 0, count: 0 });
const bountyFlow = reactive({ escrow: 0, settled: 0, refunded: 0, totalAmount: 0, feeTotal: 0 });
const renewal = reactive({ purchasers: 0, renewals: 0 });
const penetration = reactive({ active: 0, consumed: 0, rate: null as number | null });

const byTypeOption = reactive({ series: [] as any[], xAxis: { data: [] as string[] }, ...baseChart() });
const bountyOption = reactive({ series: [] as any[], ...baseChart() });

function fmt(n: number): string {
	return (n ?? 0).toLocaleString('zh-CN');
}

// echarts 基础配置
function baseChart() {
	return {
		tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
		legend: { bottom: 0, left: 'center' },
		grid: { left: 10, right: 20, top: 20, bottom: 40, containLabel: true }
	};
}

onMounted(async () => {
	try {
		const data = await service.forum.dashboard.getOverview();
		overview.value = data;

		Object.assign(recycle, data?.recycle || {});
		Object.assign(tipFlow, data?.tipFlow || {});
		Object.assign(bountyFlow, data?.bountyFlow || {});
		Object.assign(renewal, data?.renewal || {});
		Object.assign(penetration, data?.penetration || {});

		// 各出口占比：横向条形（金额 Top）
		const byType = (data?.byType || []).map((r: any) => ({
			...r,
			label: TYPE_LABELS[r.type] || r.type
		}));
		Object.assign(byTypeOption, {
			series: [
				{
					type: 'bar',
					data: byType.map((r: any) => r.amount),
					barMaxWidth: 36,
					label: { show: true, position: 'right', formatter: ({ value }: any) => String(value) }
				}
			],
			xAxis: {
				type: 'value',
				splitLine: { show: false }
			},
			yAxis: {
				type: 'category',
				data: byType.map((r: any) => `${r.label} (${r.percent}%)`)
			}
		});

		// 悬赏流转状态：环形占比
		Object.assign(bountyOption, {
			series: [
				{
					type: 'pie',
					radius: ['45%', '70%'],
					avoidLabelOverlap: false,
					itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
					label: { show: false },
					data: [
						{ name: '托管中', value: bountyFlow.escrow, itemStyle: { color: '#E6A23C' } },
						{ name: '已结算', value: bountyFlow.settled, itemStyle: { color: '#67C23A' } },
						{ name: '已退款', value: bountyFlow.refunded, itemStyle: { color: '#909399' } }
					]
				}
			]
		});
	} catch (err) {
		console.error('[dashboard] 加载看板失败:', err);
	}
});
</script>

<style scoped>
.stat-row {
	margin-bottom: 16px;
}
.stat-label {
	font-size: 13px;
	color: var(--el-text-color-secondary);
}
.stat-value {
	font-size: 26px;
	font-weight: 600;
	margin: 6px 0;
	color: var(--el-text-color-primary);
}
.stat-sub {
	font-size: 12px;
	color: var(--el-text-color-secondary);
	line-height: 1.4;
}
.chart-sub {
	margin-left: 10px;
	font-size: 12px;
	font-weight: normal;
	color: var(--el-text-color-secondary);
}
.mt-3 {
	margin-top: 16px;
}
.overview-tips {
	font-size: 13px;
	line-height: 1.8;
	color: var(--el-text-color-regular);
}
.overview-tips code {
	background: var(--el-fill-color-light);
	padding: 1px 6px;
	border-radius: 4px;
	font-size: 12px;
}
</style>
