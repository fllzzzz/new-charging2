<style lang="scss" scoped>
	.inspect-date-filter-container {
		width: 1194px;
		height: 32px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		span{
			font-size: 16px;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
		& > .box {
			height: 100%;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
		}
		#preset-filter {
			width: 289px;
			margin: 0 23px 0 23px;
		}
		#custom-filter {
			width: 366px;
			margin: 0 64px 0 21px;
			.date-picker {
				box-sizing: border-box;
				width: 270px;
				height: 32px;
				display: flex;
			}
		}
		#station-name-filter {
			width: 343px;
			span {
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
		.line#line-1 {
			width: 1px;
			height: 20px;
			background: #A0DCDA;
			opacity: 0.5;
		}
	}

	:deep(.el-radio) {
		margin: 0;
		.el-radio__label {
			font-size: 16px;
			font-family: PingFang SC;
			font-weight: 400;
			color: #A0DCDA;
		}
	}
	:deep(.el-date-editor) {
		width: 100%;
		height: 100%;
		background: rgba(2,61,70,0.97);
		border: 1px solid #2E696F;
		box-sizing: border-box;
		box-shadow: none;
		border-radius: 3px;
		input, span {
			font-size: 16px;
			font-family: PingFang SC;
			font-weight: 400;
			color: #0BD4E6;
		}
	}
	:deep(.el-select) {
		width: 264px;
		background-color: black;
		.el-input {
			input::placeholder {
				font-size: 14px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				opacity: 0.5;
			}
			.el-input__wrapper {
				box-shadow: none;
				background: rgba(2,61,70,0.97);
				border: 1px solid #2E696F;
				border-radius: 2px;
			}
		}
	}
</style>

<template>
	<div class="inspect-date-filter-container">
		<span>历史查询</span>
		<div class="box" id="preset-filter">
			<template 
				v-for="item,index in _reactive.data.presetFilterList"
				:key="index"
			>
				<el-radio
					:label="item"
				></el-radio>
			</template>
		</div>
		<div class="graph line" id="line-1"></div>
		<div class="box" id="custom-filter">
			<el-radio
				label="自定义"
			></el-radio>
			<div class="date-picker">
				<el-date-picker
					type="daterange"
					v-model="_reactive.data.datePick"
					:format="_reactive.data.dateFormat"
					:value-format="_reactive.data.dateFormat"
				>
				</el-date-picker>
			</div>
		</div>
		<div class="box" id="station-name-filter">
			<span>站名筛选</span>
			<el-select></el-select>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		reactive
	} from 'vue';

	const _reactive = reactive({
		data: {
			presetFilterList: [
				'全部', '本日', '本周', '本月'
			],
			datePick: ['2023-05-15','2023-05-15'],
			dateFormat: 'YYYY-MM-DD',
		}
	});
</script>