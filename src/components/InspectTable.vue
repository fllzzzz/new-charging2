<style lang="scss" scoped>
	.el-table {
		width: initial;
		max-width: initial;
		background-color: transparent !important;
	}
	:deep(.table-header) {
		th.el-table__cell {
			height: calc(48 * v-bind('screenManager.currentRatio.value[1]') * 1px);
			background: rgba(11,77,98,0.90);
			border-left: 1px solid #042630;
			border-bottom: 0;
			font-size: 16px;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
	:deep(.table-row) {
		--el-table-row-hover-bg-color: none;
		td.el-table__cell {
			height: calc(46 * v-bind('screenManager.currentRatio.value[1]') * 1px);
			border-bottom: 0;
			font-size: 14px;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
	:deep(.el-scrollbar__view) {
		width: 100%;
	}
	:deep(.el-table__inner-wrapper) {
		&::before {display: none;}
	}

	.btn-group {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-flow: row nowrap;
		align-items: center;
	}
	.btn {
		width: 78px;
		height: 32px;
		background: linear-gradient(0deg, rgba(20,205,198,0.88) 0%, rgba(20,205,198,0.3) 100%);
		opacity: 0.8;
		border-radius: 2px;
		margin-right: 16px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		&:last-child {
			margin-right: 0;
		}
		& > * {
			pointer-events: none;
		}
	}
</style>

<template>
	<el-table
		table-layout="auto"
		:fill="false"
		:data="_reactive.data.rowList"
		header-row-class-name="table-header"
		row-class-name="table-row"
		:row-style="setRowStyle"
	>
		<template #default>
			<template 
				v-for="column, index in _reactive.data.columnList"
				:key="index"
			>
				<template v-if="column.prop === 'options'">
					<el-table-column
						:label="column.label"
						:width="column.width * screenManager.currentRatio.value[0]"
						align="center"
					>
						<template #default="{row}">
							<template v-if="row.id">
								<div class="btn-group"
									@click="optionsClickHandler(
										$event,
										row.inspectType,
										row.reportID
									)"
								>
									<template 
										v-for="item, index in row[column.prop]"
										:key="index"
									>
										<div class="btn"
											:id="item"
										>
											<span>{{ item }}</span>
										</div>
									</template>
								</div>
							</template>
						</template>
					</el-table-column>
				</template>
				<template v-else-if="column.prop === 'inspectResult'">
					<el-table-column
						:width="column.width * screenManager.currentRatio.value[0]"
						align="center"
						>
						<!-- <template #default="{row}">
							{{ `本次任务需巡检${row.inspectResult[0]}个，异常${row.inspectResult[1]}个`}}
						</template> -->
					</el-table-column>
				</template>
				<template v-else>
					<el-table-column
						:label="column.label"
						:prop="column.prop"
						:width="column.width * screenManager.currentRatio.value[0]"
						align="center"
					>
					</el-table-column>
				</template>
			</template>
		</template>
	</el-table>
</template>

<script setup lang="ts">
	import screenManager from '@/hooks/ScreenManager';

	import type {
		PropType
	} from 'vue';

	import {
		watch,
		reactive,
		onMounted
	} from 'vue';

	type ColumnListType = {
		label :string;
		prop :string;
		width :number;
	}[];

	type RowListType = {
		[key :string] :any;
	}[];

	const emits = defineEmits(['openReport']);

	const props = defineProps({
		rowNumber: {
			type: Number,
			required: false,
			default: 15
		},
		columnList: {
			type: Array as PropType<ColumnListType>,
			required: true,
			default: null
		},
		rowList: {
			type: Array as PropType<RowListType>,
			required: true,
			default: null
		}
	});

	const _reactive = reactive({
		data: {
			columnList: [] as ColumnListType,
			rowList: [] as RowListType
		}
	});

	screenManager.useCreate(1920, 1080);
	screenManager.useExecute();

	const setRowStyle = (row :any) => {
		if(row.rowIndex % 2 == 0)
			return {backgroundColor: 'rgba(0, 16, 31, 1)'}
		else
			return {backgroundColor: 'rgba(3, 30, 46, 1)'}
	};

	const optionsClickHandler = (event :MouseEvent, ...args :any[]) => {
		const id = (event.target as HTMLElement).id;
		if(id === '查看报告') emits('openReport', ...args);
		if(id === '告警查看') emits('openReport', 'alarmCheck');
		if(id === '处置报告') emits('openReport', 'handleReport');
	};

	onMounted(() => {
		const rowListLength = _reactive.data.rowList.length;
		if( rowListLength < props.rowNumber) {
			const diff = props.rowNumber - rowListLength;
			for(let i=0; i < diff; i++) {
				_reactive.data.rowList.push({});
			}
		}
	});

	watch(() => props, (props) => {
		if(props.rowList) {
			const rowListLength = props.rowList.length;
			if( rowListLength < props.rowNumber) {
				const arr = props.rowList;
				const diff = props.rowNumber - rowListLength;
				for(let i=0; i < diff; i++) {
					arr.push({});
				}
				_reactive.data.rowList = arr;
			}else {
				_reactive.data.rowList = props.rowList;
			}
		}
		if(props.columnList) {
			_reactive.data.columnList = props.columnList;
		}
	}, {
		immediate: true,
		deep: true
	});
</script>