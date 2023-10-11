<style lang="scss" scoped>
	
	.inspect-history-container {
		width: 100vw;
		height: 100vh;
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
		bottom: 88px;
		left: 32px;
	}
	.base-pagination-container {
		position: fixed;
		right: 32px;
		bottom: 32px;
	}
	.inspect-date-filter-container {
		position: fixed;
		top: 160px;
		left: 32px;
	}
</style>

<template>
	<div class="inspect-history-container">
		<div id="title">
			<span>历史巡检</span>
			<img src="@/assets/images/icon/close-1.png">
		</div>
		<InspectDateFilter
			class="inspect-date-filter-container"
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
	import InspectDateFilter from '@/components/InspectDateFilter.vue';
	import BasePagination from '@/components/BasePagination.vue';
	import InspectTable from '@/components/InspectTable.vue';

	import {
		usePublish
	} from '@/hooks/EventEmitter';

	usePublish<boolean>('AppFooterState', false);
	usePublish<boolean>('AppSmartGuardState', false);

	const _static = {
		data: {
			columnList: [
				{
					label: '序号',
					prop: 'id',
					width: 93
				},
				{
					label: '站名',
					prop: 'stationName',
					width: 253
				},
				{
					label: '巡检开始时间',
					prop: 'startTime',
					width: 220
				},
				{
					label: '巡检内容',
					prop: 'inspectContent',
					width: 450
				},
				{
					label: '巡检方式',
					prop: 'inspectType',
					width: 133
				},
				{
					label: '巡检结果',
					prop: 'inspectResult',
					width: 320
				},
				{
					label: 'options',
					prop: 'options',
					width: 300
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
</script>