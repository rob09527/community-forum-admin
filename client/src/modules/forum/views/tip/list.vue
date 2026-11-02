<template>
	<div class="tip-page">
		<cl-crud ref="Crud">
			<cl-row>
				<!-- 刷新 -->
				<cl-refresh-btn />
				<cl-flex1 />
				<!-- 搜索：目标类型 / 时间范围 / 金额区间 / 用户关键字 -->
				<cl-search-key :placeholder="t('搜索赞赏者 / 接收者')" />
				<cl-search ref="Search" />
			</cl-row>

			<cl-row>
				<cl-table ref="Table" />
			</cl-row>

			<cl-row>
				<cl-flex1 />
				<cl-pagination />
			</cl-row>
		</cl-crud>

		<!-- 流动聚合分析（排查小号搬运 / 异常流动的第一入口 [2.5]） -->
		<el-card class="agg-card" shadow="never">
			<template #header>
				<div class="flex items-center justify-between">
					<span>📊 流动聚合分析</span>
					<span class="agg-tip">赞赏为零和流转：只统计流动方向，不进「发行 vs 回收」口径</span>
				</div>
			</template>

			<el-tabs v-model="aggTab">
				<!-- 按发送方聚合 -->
				<el-tab-pane :label="t('按发送方')" name="sender">
					<div class="agg-toolbar">
						<span class="agg-desc">同一人向多少人赞赏 / 多少笔 / 总额 —— 排查小号搬运</span>
						<el-input-number v-model="aggMinTotal" :min="1" :step="10" size="small" />
						<span class="agg-unit">累计 ≥ 该值才展示</span>
						<el-button size="small" type="primary" :loading="aggLoading" @click="loadAgg">查询</el-button>
					</div>
					<el-table :data="senderItems" border size="small" max-height="420">
						<el-table-column label="发送方" prop="username" min-width="140" />
						<el-table-column label="接收人数" prop="receiverCount" width="100" />
						<el-table-column label="赞赏笔数" prop="tipCount" width="100" />
						<el-table-column label="累计总额" prop="totalAmount" width="120" />
					</el-table>
				</el-tab-pane>

				<!-- 按接收方聚合 -->
				<el-tab-pane :label="t('按接收方')" name="receiver">
					<div class="agg-toolbar">
						<span class="agg-desc">同一人收到多少赞赏 / 多少笔 / 总额 —— 排查异常流入</span>
						<el-input-number v-model="aggMinTotal" :min="1" :step="10" size="small" />
						<span class="agg-unit">累计 ≥ 该值才展示</span>
						<el-button size="small" type="primary" :loading="aggLoading" @click="loadAgg">查询</el-button>
					</div>
					<el-table :data="receiverItems" border size="small" max-height="420">
						<el-table-column label="接收方" prop="username" minWidth="140" />
						<el-table-column label="赞赏人数" prop="senderCount" width="100" />
						<el-table-column label="赞赏笔数" prop="tipCount" width="100" />
						<el-table-column label="累计总额" prop="totalAmount" width="120" />
					</el-table>
				</el-tab-pane>

				<!-- 同方同收对预警 -->
				<el-tab-pane :label="t('同方同收对预警')" name="pair">
					<div class="agg-toolbar">
						<span class="agg-desc">单一通道大额转移 —— 小号搬运最典型特征，异常偏高需关注</span>
						<el-input-number v-model="aggMinTotal" :min="1" :step="10" size="small" />
						<span class="agg-unit">累计 ≥ 该值才展示</span>
						<el-button size="small" type="primary" :loading="aggLoading" @click="loadAgg">查询</el-button>
					</div>
					<el-table :data="pairItems" border size="small" max-height="420">
						<el-table-column label="发送方" prop="fromUserName" minWidth="140" />
						<el-table-column label="接收方" prop="toUserName" minWidth="140" />
						<el-table-column label="赞赏笔数" prop="tipCount" width="100" />
						<el-table-column label="累计总额" prop="totalAmount" width="120" />
					</el-table>
				</el-tab-pane>
			</el-tabs>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'forum-tip-list'
});

import { useCrud, useSearch, useTable } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

const { service } = useCool();
const { t } = useI18n();

// 目标类型字典（对齐 forum schema）
const options = reactive({
	targetType: [
		{ label: '帖子', value: 'post', type: 'primary' },
		{ label: '评论', value: 'comment', type: 'success' }
	]
});

// cl-table
const Table = useTable({
	columns: [
		{
			label: 'ID',
			prop: 'id',
			width: 70
		},
		{
			label: t('赞赏者'),
			prop: 'fromUserName',
			minWidth: 130
		},
		{
			label: t('接收者'),
			prop: 'toUserName',
			minWidth: 130
		},
		{
			label: t('目标'),
			prop: 'targetType',
			dict: options.targetType,
			width: 90
		},
		{
			label: t('目标ID'),
			prop: 'targetId',
			width: 90,
			formatter: row => (row.targetId ? `#${row.targetId}` : '—')
		},
		{
			label: t('金额'),
			prop: 'amount',
			width: 90
		},
		{
			label: t('留言'),
			prop: 'message',
			minWidth: 160,
			showOverflowTooltip: true,
			formatter: row => row.message || '—'
		},
		{
			label: t('时间'),
			prop: 'createdAt',
			minWidth: 170
		}
	]
});

// cl-search（目标类型 / 时间范围 / 金额区间）
const Search = useSearch({
	items: [
		{
			label: t('目标'),
			prop: 'targetType',
			component: {
				name: 'cl-select',
				props: { options: options.targetType, refreshOnChange: false },
				style: { width: '120px' }
			}
		},
		{
			label: t('时间'),
			prop: 'createdAt',
			component: {
				name: 'cl-date-picker',
				props: { enableRefresh: false },
				style: { width: '360px' }
			}
		},
		{
			label: t('金额区间'),
			prop: 'amount',
			component: {
				name: 'cl-number-range',
				props: { startPlaceholder: '最小金额', endPlaceholder: '最大金额', min: 0 },
				style: { width: '260px' }
			}
		}
	],
	onSearch(data, { next }) {
		// datetimeRange → startCreatedAt/endCreatedAt；inputRange → minAmount/maxAmount
		const [startCreatedAt, endCreatedAt] = data.createdAt || [];
		const [minAmount, maxAmount] = data.amount || [];
		next({
			createdAt: undefined,
			amount: undefined,
			targetType: data.targetType,
			startCreatedAt,
			endCreatedAt,
			minAmount,
			maxAmount
		});
	}
});

// cl-crud
const Crud = useCrud({ service: service.forum.tip }, app => {
	app.refresh();
});

// ── 流动聚合分析 ──
const aggTab = ref('sender');
const aggMinTotal = ref(100);
const aggLoading = ref(false);

const senderItems = ref<any[]>([]);
const receiverItems = ref<any[]>([]);
const pairItems = ref<any[]>([]);

async function loadAgg() {
	aggLoading.value = true;
	try {
		const params = { minTotal: aggMinTotal.value || 100 };
		const [sender, receiver, pair] = await Promise.all([
			service.forum.tip.aggregateBySender(params),
			service.forum.tip.aggregateByReceiver(params),
			service.forum.tip.aggregateByPair(params)
		]);
		senderItems.value = sender?.items || [];
		receiverItems.value = receiver?.items || [];
		pairItems.value = pair?.items || [];
		// 同方同收对出现即提示关注（预警语义）
		if (pairItems.value.length) {
			ElMessage.warning(t('检测到 {n} 组「同方同收对」累计赞赏超过阈值，建议关注异常流动', { n: pairItems.value.length }));
		}
	} catch (err) {
		console.error('[tip] 聚合查询失败:', err);
	} finally {
		aggLoading.value = false;
	}
}
</script>

<style scoped>
.agg-card {
	margin-top: 16px;
}
.agg-tip {
	font-size: 12px;
	color: var(--el-text-color-secondary);
}
.agg-toolbar {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 12px;
}
.agg-desc {
	flex: 1;
	font-size: 12px;
	color: var(--el-text-color-secondary);
}
.agg-unit {
	font-size: 12px;
	color: var(--el-text-color-secondary);
}
</style>
