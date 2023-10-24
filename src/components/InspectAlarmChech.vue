<style lang="scss" scoped>
	.inspect-alarm-check-container {
		img {
			object-fit: fill;
		}
		width: 542px;
		height: 985px;
		background: rgba(2,21,25,0.8);
		border: 1px solid #005B5B;
		box-sizing: border-box;
		pointer-events: none;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-around;
		align-items: flex-end;
		& > .item {
			box-sizing: border-box;
			pointer-events: auto;
			border: 2px dotted red;
		}
		.row {
			width: 100%;
		}
		.col {
			height: 100%;
		}
		.row, .col {
			display: flex;
			align-items: center;
		}
		#content {
			width: 501px;
			height: 532px;
			display: flex;
			flex-flow: column nowrap;
			.row {
				&:first-child {
					height: 32px;
					justify-content: space-between;
					margin-bottom: 22px;
					span {
						font-size: 18px;
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: #FFFFFF;
					}
					img {
						object-fit: fill;
						width: 32px;
						height: 32px;
					}
				}
				&:not(:first-child) {
					margin-bottom: 16px;
					&:last-child {
						margin-bottom: 0;
					}
					span {
						font-size: 14px;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 24px;
					}
					img {
						margin-right: 17px;
						width: 22px;
						height: 22px;
					}
				}
				&#image {
					margin-top: -11px;
					display: flex;
					flex-flow: column nowrap;
					justify-content: flex-start;
					align-items: flex-start;
					span {
						font-size: 14px;
						font-family: DINPro;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 24px;
						opacity: 0.8;
					}
					img {
						width: 480px;height: 269px;
						margin: unset;
						object-fit: fill;
					}
				}
				&#btn-group {
					width: 208px;
					height: 100px !important;
					
					background-color: black;
				}
			}
		}
		#video {
			align-self: center;
			width: 490px;
			height: 306px;
		}
		#options {
			width: 220px;
			height: 36px;
		}
	}
</style>

<template>
	<div class="inspect-alarm-check-container">
		<div class="item" id="content">
			<div class="row">
				<span>告警查看</span>
				<img src="@/assets/images/icon/close-1.png">
			</div>
			<div class="row">
				<img
					id="time"
					src="@/assets/images/icon/time-1.png">
				<span>{{ _reactive.data.time }}</span>
			</div>
			<div class="row">
				<img
					id="monitor"
					src="@/assets/images/icon/monitor.png">
				<span>{{ _reactive.data.name }}</span>
			</div>
			<div class="row">
				<img
					id="alarm"
					src="@/assets/images/icon/alarm-1.png">
				<template
					v-for="alarm, index in _reactive.data.alarmList"
					:key="index"
				>
					<template 
						v-if="index === _reactive.data.alarmList.length - 1"
					>
						<span>{{ alarm }}。</span>
					</template>
					<template v-else>
						<span>{{ alarm }}，</span>
					</template>
				</template>
			</div>
			<div class="row">
				<img
					id="img"
					src="@/assets/images/icon/img-1.png">
				<span>告警照片</span>
			</div>
			<div class="row" id="image">
				<span>{{ new Date().toLocaleString() }}</span>
				<img src="@/assets/images/background/test-1.png">
			</div>
			<div class="row" id="btn-group">

			</div>
		</div>
		<div class="item" id="video"></div>
		<div class="item" id="options">

		</div>
	</div>
</template>

<script setup lang="ts">
	import type {
		DeviceInfo
	} from '@/types';

	import {
		reactive
	} from 'vue'

	const _reactive = reactive({
		data: {
			deviceInfo: {} as DeviceInfo,
			time: new Date().toLocaleString(),
			name: '1号充电桩东北角',
			image: require<string>('@/assets/images/background/test-1.png'),
			alarmList: ['充电桩未归位', '充电桩外观损坏', '充电桩外观损坏']
		}
	});
</script>