<style lang="scss" scoped>
	.cloudController-container {
		width: 100%;height: 100%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		pointer-events: none;
		& > .block {
			pointer-events: none;
			&:first-child {
				margin-bottom: 16px;
			}
		}
		& > .block:nth-of-type(1) {
			width: 221px;
			height: 202px;
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			align-items: center;
			#title {
				align-self: flex-start;
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: center;
				& > .graph.line {
					width: 2px;
					height: 16px;
					background: #11D0D9;
				}
				span {
					font-size: 16px;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #FFFFFF;
					margin-left: 9px;
				}
			}
		}
		& > .block:nth-of-type(2) {
			width: 227px;
			margin-left: 10px;
		}
	}

	.functions {
		pointer-events: auto;
		width: calc(var(--width) * 1px);
		height: calc(var(--height) * 1px);
		margin-bottom: 16px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		&:last-child {
			margin-bottom: 0;
		}
		span {
			font-size: 14px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
			text-shadow: 0px 1px 6px rgba(5,46,45,0.34);
		}
		:deep(.el-select){
			.el-input {
				border: 1px solid #00E0D8;
				.el-input__wrapper {
					box-shadow: none;
					opacity: 0.8;
					border-radius: 0;
					background: linear-gradient(0deg, #069E99 0%, #17C7C1 100%);
				}
				.el-input__inner {
					&, &::placeholder {
						font-size: 14px;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 14px;
					}
				}
				.el-input__suffix {
					position: absolute;
					right: 10px;
					top: 50%;
					transform: translateY(-50%);
					.graph.triangle {
						width: 0;height: 0;
						border-top: 8px solid #FFFFFF;
						border-left: 5px solid transparent;
						border-right: 5px solid transparent;
					}
				}
			}
		}
		&:nth-of-type(1) {
			:deep(.el-select){
				width: 74px;
			}
		}
		&:nth-of-type(2) {
			:deep(.el-select){
				width: 154px;
			}
		}
		&:nth-of-type(3) {
			#start {
				width: 74px;
				height: 28px;
				border: 1px solid #00E0D8;
				background: linear-gradient(0deg, #069E99 0%, #17C7C1 100%);
				opacity: 0.8;
				line-height: 28px;
				text-align: center;
				span {
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
			img {
				width: 24px;
				height: 24px;
				object-fit: fill;
			}
		}
	}
</style>

<template>
	<div class="cloudController-container">
		<div class="block">
			<div id="title">
				<div class="graph line"></div>
				<span>云台控制</span>
			</div>
			<AppRingController
				@controller="handleController"
			></AppRingController>
		</div>
		<div class="block">
			<template
				v-for="item, in _reactive.data.functionList"
				:key="item.id"
			>
				<div 
					class="functions"
					:id="item.name"
					:style="{
						'--width': item.size[0],
						'--height': item.size[1]
					}"
				>
					<span>{{ item.showName }}</span>
					<template
						v-if="item.name === 'video-record'"
					>
						<div id="start">
							<span>结束</span>
						</div>
						<img src="@/assets/images/icon/play.png">
						<img src="@/assets/images/icon/download.png">
					</template>
					<template v-else>
						<el-select
							v-if="item.name === 'camera-speed'"
							:suffix-icon="_reactive.data.selectSuffix"
							:placeholder="_reactive.data.cameraSpeedList[0]"
						>
							<template
								v-for="option,index in _reactive.data.cameraSpeedList"
								:key="index"	
							>
								<el-option
									:label="option"
									:value="option"
								></el-option>
							</template>
						</el-select>
						<el-select
							v-if="item.name === 'preset-position'"
							:suffix-icon="_reactive.data.selectSuffix"
							:placeholder="_reactive.data.presetPositionList[0]"
						>
							<template
								v-for="option,index in _reactive.data.presetPositionList"
								:key="index"
							>
								<el-option
									:label="option"
									:value="option"
								></el-option>
							</template>
						</el-select>
					</template>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	import AppRingController from './AppRingController.vue';

	import {
		h,
		reactive,
		PropType,
		defineComponent,
		watchEffect
	} from 'vue';

	import { cloudController,Direction } from '@/api/default';

	import {
		DeviceInfo
	} from '@/types';

	type Config = DeviceInfo;

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
		}
	});

	const handleController = (p :Direction) => {
		if(! props.config) throw new Error('device is not defined');

		cloudController(props.config, p)
	}

	const _reactive = reactive({
		data: {
			selectSuffix: defineComponent({
				render() {
					return h('div', {
						class: ['graph', 'triangle'],
					})
				}
			}),
			cameraSpeedList: [1,2,3,4,5],
			presetPositionList: ['position1', 'position2', 'position3'],
			functionList: [
				{
					id: 1,
					name: 'camera-speed',
					showName: '镜头转速',
					size: [147, 28]
				},
				{
					id: 2,
					name: 'preset-position',
					showName: '预置位',
					size: [227, 28]
				},
				{
					id: 3,
					name: 'video-record',
					showName: '视频录制',
					size: [227, 28]
				}
			]
		}
	});
</script>