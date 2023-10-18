<style lang="scss" scoped>
	.deviceList-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		pointer-events: none;
		box-sizing: border-box;
		& > .item {
			width: 100%;
			pointer-events: auto;
			box-sizing: border-box;
		}
		& > .item:nth-of-type(1) {
			height: 34px;
			margin-bottom: 16px;
		}
		& > .item:nth-of-type(2) {
			flex: 1;
			overflow: hidden;
		}
	}

	:deep(.el-input) {
		width: 100%;
		height: 100%;
		.el-input__wrapper {
			padding: 10px 18px 8px 18px;
			box-shadow: none;
			background-color: transparent;
			background-image: url('@/assets/images/background/search.png');
			.el-input__inner {
				font-size: 16px;
				font-family: PingFangSC;
				font-weight: 400;
				color: #A0DCDA;
				&::placeholder {
					font-size: 16px;
					font-family: PingFangSC;
					font-weight: 400;
					color: #A0DCDA;
				}
			}
			.el-input__suffix {
				position: absolute;
				right: 10px;
			}
		}
	}
	.el-input-slot {
		&#suffix {
			width: 18px;
			height: 18px;
			margin: 0;
			object-fit: fill;
		}
	}
	.device {
		width: 99%;
		height: 30px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		img {
			margin-right: 10px;
			width: 24px;height: 24px;
			object-fit: fill;
		}
		span {
			font-size: 16px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #DBFFFE;
		}
		@for $i from 1 through 5 {
			@if $i % 2  == 0 {
				&:nth-of-type(#{$i}) {
					background: linear-gradient(90deg, rgba(0, 255, 246, 0.5) 0%, transparent 100%);
				}
			}
		}
	}
</style>

<template>
	<div class="deviceList-container">
		<div class="item">
			<el-input
				placeholder="请输入名称搜索"
				v-model="_reactive.data.searchInput"
			>
				<template #suffix>
					<img class="el-input-slot"
						id="suffix"
						src="@/assets/images/icon/search.png">
				</template>
			</el-input>
		</div>
		<div class="item">
			<el-scrollbar>
				<template #default>
					<template
						v-for="(device,index) in _reactive.data.deviceList"
						:key="index"
					>
						<div class="device">
							<template
								v-if="device.state === 0"
							>
								<img :src="_reactive.data.imgList[1]">
							</template>
							<template v-else>
								<img :src="_reactive.data.imgList[0]">
							</template>
							<span>{{ device.name }}</span>
						</div>
					</template>
				</template>
			</el-scrollbar>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		reactive
	} from 'vue';

	const _reactive = reactive({
		data: {
			searchInput: undefined as undefined | string,
			imgList: [
				require<string>('@/assets/images/icon/monitor-2_online.png'),
				require<string>('@/assets/images/icon/monitor-2_offline.png'),
			],
			deviceList: [
				{
					name: '摄像头1',
					deviceSerial: '',
					channelNo: 0,
					state: 1
				},
				{
					name: '摄像头2',
					deviceSerial: '',
					channelNo: 0,
					state: 0
				},
				{
					name: '摄像头3',
					deviceSerial: '',
					channelNo: 0,
					state: 1
				},
				{
					name: '摄像头4',
					deviceSerial: '',
					channelNo: 0,
					state: 0
				},
				{
					name: '摄像头5',
					deviceSerial: '',
					channelNo: 0,
					state: 0
				},
				{
					name: '摄像头1',
					deviceSerial: '',
					channelNo: 0,
					state: 1
				},
				{
					name: '摄像头2',
					deviceSerial: '',
					channelNo: 0,
					state: 0
				},
				{
					name: '摄像头3',
					deviceSerial: '',
					channelNo: 0,
					state: 1
				},
				{
					name: '摄像头4',
					deviceSerial: '',
					channelNo: 0,
					state: 0
				},
				{
					name: '摄像头5',
					deviceSerial: '',
					channelNo: 0,
					state: 0
				},
			]
		}
	});
</script>