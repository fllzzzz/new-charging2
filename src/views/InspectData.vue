<style lang="scss" scoped>
	.inspect-data-container {
		width: 100vw;
		height: 100vh;
		position: fixed;
		background-color: rgba(0, 9, 14, 1);
		#title {
			width: 1856px;
			height: 40px;
			position: fixed;
			top: 96px;
			left: 32px;
			background-repeat: no-repeat;
			background-size: contain;
			background-image: url('@/assets/images/background/inspect-title.png');
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			span {
				margin-left: 57px;
				font-size: 20px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #25FFF8;
			}
			img {
				width: 32px;
				height: 32px;
				object-fit: contain;
				margin-right: 5px;
			}
		}
	}
	.inspect-table-container {
		position: fixed;
		bottom: calc(88 * v-bind('screenManager.currentRatio.value[1]') * 1px);
		left: 32px;
	}
	.base-pagination-container {
		position: fixed;
		right: 32px;
		bottom: 32px;
	}
	.inspect-filter-container {
		position: fixed;
		top: 160px;
		left: 32px;
	}
</style>

<template>
	<div class="inspect-data-container">
		<div id="title">
			<span>{{ _reactive.data.title }}</span>
			<img src="@/assets/images/icon/close-1.png"
				id="close"
				@click="clickDispenser"
			>
		</div>
		<InspectDateFilter
			class="inspect-filter-container"
		></InspectDateFilter>
		<InspectTable
			class="inspect-table-container"
			:column-list="_static.data.columnList"
			:row-list="_static.data.rowList"
		></InspectTable>
		<BasePagination
			class="base-pagination-container"
		></BasePagination>
	</div>
</template>

<script setup lang="ts">
	import screenManager from '@/hooks/ScreenManager';

	import InspectDateFilter from '@/components/InspectFilter.vue';
	import BasePagination from '@/components/BasePagination.vue';
	import InspectTable from '@/components/InspectTable.vue';

	import {
		usePublish
	} from '@/hooks/EventEmitter';

	import {
		useRouter
	} from 'vue-router';

	import {
		watch,
		reactive
	} from 'vue';

	type ModelInovkeType = {
		title :string;
	};

	const props = defineProps({
		model: {
			type: String,
			required: false,
			default: undefined
		}
	});

	const router = useRouter();

	const _reactive = reactive({
		data: {
			title: undefined as undefined | string,
		}
	});

	const _static = {
		data: {
			columnList: [
				{
					label: '序号',
					prop: 'id',
					width: 103
				},
				{
					label: '站名',
					prop: 'stationName',
					width: 263
				},
				{
					label: '巡检开始时间',
					prop: 'startTime',
					width: 230
				},
				{
					label: '巡检内容',
					prop: 'inspectContent',
					width: 460
				},
				{
					label: '巡检方式',
					prop: 'inspectType',
					width: 143
				},
				{
					label: '巡检结果',
					prop: 'inspectResult',
					width: 330
				},
				{
					label: 'options',
					prop: 'options',
					width: 320
				},
			],
			rowList: [
				{
					id: 1,
					stationName: 'stationName',
					startTime: 'startTime',
					inspectContent: 'inspectContent',
					inspectType: 'inspectType',
					inspectResult: 'inspectResult',
					options: ['查看报告', '下载报告'],
				}
			]
		}
	};

	const modelInovke = new Map<string, ModelInovkeType>([
		['history', {
			title: '历史巡检',
		}],
		['warn', {
			title: '告警',
		}],
	]);

	const clickEventInovke = new Map<string, ((
		event :MouseEvent,
		...args :any[]
	) => void)>([
		['close', () => {
			router.back();
			usePublish<boolean>('AppFooterState', true);
			usePublish<boolean>('AppSmartGuardState', true);
			usePublish<boolean>('AppHeaderL2State', true);
		}]
	]);

	usePublish<boolean>('AppFooterState', false);
	usePublish<boolean>('AppHeaderL2State', false);
	usePublish<boolean>('AppSmartGuardState', false);

	const clickDispenser = (event :MouseEvent) => {
		const id = (event.target as HTMLElement).id;
		const fn = clickEventInovke.get(id);
		if(!fn)	return;
		fn(event);
	};

	watch(() => props.model, (model) => {
		if(!model) return;
		_reactive.data.title = modelInovke.get(model)?.title;
	}, {
		immediate: true,
	});
</script>