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

	.report-container {
		position: fixed;
		top: 193px;
		right: 31px;
	}
	.alarm-card-container {
		position: fixed;
		top: 83px;
		right: 16px;
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
			:column-list="_reactive.data.tableData.columnList"
			:row-list="_reactive.data.tableData.rowList"
			@open-report="openReportHandler"
		></InspectTable>
		<BasePagination
			class="base-pagination-container"
		></BasePagination>
		<component
			:is="_reactive.data.reportModel"
			:class="_reactive.data.boxClassName"
			@close="reportCloseHandler"
		></component>
	</div>
</template>

<script setup lang="ts">
	import InspectAlarmCheck from '@/components/InspectAlarmCheck.vue';
	import InspectReportDigital from '@/components/InspectReportDigital.vue';
	import InspectReportVideo from '@/components/InspectReportVideo.vue';
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
			boxClassName: undefined as undefined | string,
			title: undefined as undefined | string,
			reportModel: null as null | any,
			tableData: {
				rowList: null as null | any,
				columnList: null as null | any
			}
		}
	});

	const _static = {
		data: {
			historyModel: {
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
						stationName: '站名称',
						startTime: '开始时间',
						inspectContent: '巡检内容',
						inspectType: '视频巡检',
						inspectResult: '巡检结果',
						options: ['查看报告', '下载报告'],
					}
				]
			},
			warnModel: {
				columnList: [
					{
						label: '序号',
						prop: 'id',
						width: 93
					},
					{
						label: '站名',
						prop: 'stationName',
						width: 232
					},
					{
						label: '告警内容',
						prop: 'alarmContent',
						width: 388
					},
					{
						label: '摄像头名称',
						prop: 'monitorName',
						width: 256
					},
					{
						label: '告警时间',
						prop: 'alarmTime',
						width: 213
					},
					{
						label: '问题类型',
						prop: 'alarmType',
						width: 185
					},
					{
						label: '处理状态',
						prop: 'handleStatus',
						width: 139
					},
					{
						label: '告警确认',
						prop: 'options',
						width: 344
					},
				],
				rowList: [
					{
						id: 1,
						stationName: '站名称',
						alarmContent: ['充电枪未归位', '充电桩外观损坏', '充电桩生锈'],
						monitorName: '1号充电桩东北角',
						alarmTime: '2023/5/16 14:29：32',
						alarmType: '充电桩问题',
						handleStatus: '未处理',
						options: ['告警查看', '已处理', '处置报告']
					}
				]
			}
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

	const openReportHandler = (...args :any) => {
		if(args[0] === '视频巡检') {
			_reactive.data.reportModel = InspectReportVideo;
			_reactive.data.boxClassName = 'report-container';
		}else if(args[0] === '数字巡检') {
			_reactive.data.reportModel = InspectReportDigital;
			_reactive.data.boxClassName = 'report-container';
		}else if(args[0] === 'alarmCheck'){
			_reactive.data.reportModel = InspectAlarmCheck;
			_reactive.data.boxClassName = 'alarm-card-container';
		}else {
			_reactive.data.reportModel = null;
		}
	};

	const reportCloseHandler = () => {
		_reactive.data.reportModel = null;
	};

	watch(() => props.model, (model) => {
		if(!model) return;
		_reactive.data.title = modelInovke.get(model)?.title;
		if(model === 'history') {
			_reactive.data.tableData.columnList = 
				_static.data.historyModel.columnList;
			_reactive.data.tableData.rowList = 
				_static.data.historyModel.rowList;
		}else if(model === 'warn') {
			_reactive.data.tableData.columnList = 
				_static.data.warnModel.columnList;
			_reactive.data.tableData.rowList = 
				_static.data.warnModel.rowList;
		}
	}, {
		immediate: true,
	});
</script>