<style lang="scss" scoped>
	.inspectReport-video-container {
		width: 605px;
		height: 652px;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		pointer-events: none;
		box-sizing: border-box;
		& > .item {
			pointer-events: auto;
			box-sizing: border-box;
			width: 100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}
		#header {
			flex: 1;
			background-image: url('@/assets/images/background/header.png');
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			#title {
				margin-left: 13px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: center;
				img {
					width: 16px;height: 16px;
					object-fit: fill;
					margin-right: 11px;
				}
				span {
					font-size: 16px;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 22px;
				}
			}
			& > img {
				width: 24px;
				height: 22px;
				object-fit: fill;
				align-self: flex-start;
			}
		}
		#body {
			height: 618px;
			background-image: url('@/assets/images/background/body-2.png');
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-around;
			align-items: center;
			& > .box {
				box-sizing: border-box;
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
			#content {
				width: 573px;
				height: 465px;
				.block {
					width: 544px;
					height: 146px;
					box-sizing: border-box;
					margin-bottom: 20px;
					&:last-child {
						margin-bottom: 0;
					}
					display: flex;
					flex-flow: row nowrap;
					justify-content: space-between;
					align-items: flex-start;
					.district {
						height: 100%;
						box-sizing: border-box;
						&:nth-of-type(1) {
							width: 250px;
							img {
								width: 100%;height: 100%;
								object-fit: fill;
							}
						}
						&:nth-of-type(2) {
							width: 280px;
							display: flex;
							flex-flow: column nowrap;
							span {
								font-size: 14px;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #FFFFFF;
								line-height: 98px;
							}
							& > .row {
								width: 100%;
								box-sizing: border-box;
								display: flex;
								flex-flow: row nowrap;
								align-items: center;
								.col {
									height: 100%;
									box-sizing: border-box;
									display: flex;
								}
								&:nth-of-type(1) {
									height: 24px;
									justify-content: space-between;
									& > .col {
										flex-flow: row nowrap;
										align-items: center;
										&:nth-of-type(1) {
											justify-content: flex-start;
											.graph.dot {
												width: 5px;
												height: 5px;
												background: #00EAFF;
												margin-right: 8px;
											}
										}
										&:nth-of-type(2) {
											justify-content: space-between;
											img {
												width: 20px;height: 20px;
												object-fit: fill;
												margin-right: 8px;
												&:last-child {
													margin-right: 0;
												}
											}
										}
									}
								}
								&:nth-of-type(2) {
									flex: 1;
									margin-top: 10px;
									margin-bottom: 6px;
									span {
										line-height: unset;
									}
								}
								&:nth-of-type(3) {
									height: 13px;
									justify-content: flex-start;
								}
							}
						}
					}
				}
			}
			#download {
				width: 88px;
				height: 32px;
				background-image: url('@/assets/images/background/btn-1.png');
				display: flex;
				flex-flow: row nowrap;
				justify-content: center;
				align-items: center;
				& > * {
					pointer-events: none;
				}
				span {
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
		}
	}

	:deep(.el-scrollbar) {
		.is-vertical {
			width: 6px;
			.el-scrollbar__thumb {
				background: #11E6F0;
				opacity: 0.48;
				border-radius: 3px;
			}
		}
	}
</style>

<template>
	<div class="inspectReport-video-container">
		<div class="item" id="header">
			<div id="title">
				<img src="@/assets/images/icon/report.png">
				<span>巡检报告</span>
			</div>
			<img src="@/assets/images/icon/close.png">
		</div>
		<div class="item" id="body">
			<div class="box" id="content">
				<el-scrollbar
					:noresize="true"
				>
					<template #default>
						<template
							v-for="item in _reactive.data.reportList"
							:key="item.id"
						>
							<div class="block">
								<div class="district">
									<img :src="item.image">
								</div>
								<div class="district">
									<div class="row">
										<div class="col">
											<div class="graph dot"></div>
											<span>{{ item.title }}</span>
										</div>
										<div class="col">
											<template
												v-for="btn in _reactive.data.btnList"
												:key="btn.id"
											>
												<img :src="btn.image" :id="btn.name">	
											</template>
										</div>
									</div>
									<div class="row">
										<span>
											充电枪无未归位，充电桩无外观损坏，充电桩无生锈，车位无异物，地面无积水，充电桩无高温风险，充电站无水浸风险，充电站无火灾风险
										</span>
									</div>
									<div class="row">
										<span>其他： {{ item.keyWord[item.keyWord.length - 1] }}</span>
									</div>
								</div>
							</div>
						</template>
					</template>
				</el-scrollbar>
			</div>
			<div class="box" id="download">
				<span>下载报告</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type {
		DeviceInfo
	} from '@/types';

	import {
		reactive
	} from 'vue';

	const _reactive = reactive({
		data: {
			btnList: [
				{
					id: 1,
					name: 'monitor',
					image: require<string>('@/assets/images/icon/monitor-3.png')
				},
				{
					id: 1,
					name: 'editor',
					image: require<string>('@/assets/images/icon/editor.png')
				},
			],
			reportList: [
				{
					id: 1,
					deviceInfo: {} as DeviceInfo,
					title: 'default01',
					image: require<string>('@/assets/images/background/test-1.png'),
					keyWord: ['key1', 'key2', 'key3'] as string[]
				},
				{
					id: 2,
					deviceInfo: {} as DeviceInfo,
					title: 'default02',
					image: require<string>('@/assets/images/background/test-1.png'),
					keyWord: ['key1', 'key2', 'key3'] as string[]
				},
				{
					id: 3,
					deviceInfo: {} as DeviceInfo,
					title: 'default03',
					image: require<string>('@/assets/images/background/test-1.png'),
					keyWord: ['key1', 'key2', 'key3'] as string[]
				},
			],
		}
	});
</script>