<style lang="scss" scoped>
	.scene-controller {
		width: 100vw;
		height: 100vh;
		position: fixed;
		pointer-events: none;
		& > .item {
			box-sizing: border-box;
			pointer-events: auto;
			background-repeat: no-repeat;
			background-size: contain;
			position: absolute;
		}
		& > .item#handle-setups {
			top: 98px;
			right: 20px;
			width: 300px;
			height: 610px;
			background-image: url('@/assets/images/background/immcontroller-handle-list.png');
			padding-top: 15px;
			& > span {
				font-size: 16px;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #00FFFF;
				margin-left: 18px;
			}
			#time-line {
				width: 100%;
				height: 100%;
				margin-top: 25px;
			}
			:deep(.el-timeline) {
				.el-timeline-item {
					.el-timeline-item__tail {
						border-left: 3px solid #00FFFF;
					}
					.el-timeline-item__dot {
						width: 20px;
						height: 20px;
						background: #1D9DFF;
						border-radius: 4px;
						left: -5px;
						span {
							font-size: 14px;
							font-family: DINPro;
							font-weight: 500;
							color: #FFFFFF;
						}
					}
					.el-timeline-item__wrapper {
					.el-timeline-item__timestamp {
							font-size: 16px;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #FFFFFF;
						}
						.el-timeline-item__content {
							display: flex;
							flex-flow: column nowrap;
							justify-content: flex-start;
							align-items: flex-start;

							span.text {
								font-size: 14px;
								font-family: Adobe Heiti Std;
								font-weight: normal;
								color: #FFFFFF;
							}

							span.time {
								font-size: 12px;
								font-family: DIN;
								font-weight: 400;
								color: #FFFFFF;
							}
							.item {
								width: 100%;
								height: 30px;
								margin-bottom: 15px;
								display: flex;
								flex-flow: column nowrap;
								justify-content: flex-start;
								align-items: flex-start;
								.row {
									img {
										width: 16px;
										height: 16px;
										object-fit: contain;
										margin-right: 6px;
									}
									display: flex;
									flex-flow: row nowrap;
									justify-content: flex-start;
									align-items: center;
								}
								#row2 {
									align-self: flex-end;
									margin-right: 75px;
								}
							}
						}
					}
				}
			}
		}
		#rightDown-box {
			right: 20px;
			bottom: 193px;
			width: 300px;
			height: 246px;
			background-image: url('@/assets/images/background/immcontroller-person.png');
			span {
				position: absolute;
				&:nth-of-type(1) {
					top: 10px;
					left: 23px;
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #00FFFF;
					line-height: 34px;
				}
				&:nth-of-type(2), &:nth-of-type(3) {
					top: 57px;
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 26px;
				}
				&:nth-of-type(2) {
					left: 34px;
					color: #00FFFF;
				}
				&:nth-of-type(3) {
					left: 90px;
					color: #FFFFFF;
				}
			}
		}
		#left-box {
			width: 300px;
			height: 789px;
			left: 20px;
			top: 98px;
		}
	}

	#big-video-box {
		pointer-events: none;
		width: 1240px;
		height: 715px;
		border: 1px solid #00FFFF;
		border-radius: 0px 0px 8px 0px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: relative;
		img {
			z-index: 100;
			pointer-events: auto;
			position: absolute;
			width: 24px;
			height: 24px;
			top: 5px;
			&:first-child {
				right: 40px;
			}
			&:nth-of-type(2) {
				right: 5px;
			}
		}
	}
</style>

<template>
	<div class="container scene-controller">
		<div class="item" id="handle-setups">
			<span class="description">处理步骤</span>
			<div id="time-line">
				<el-timeline>
					<el-timeline-item :timestamp="'告警视频列表'" placement="top" color="#1D9DFF">
						<template #dot>
							<span class="descriptipn">1</span>
						</template>
						<template #default>
							<template v-for="index in 3" :key="index">
								<div class="item" :id="index.toString()">
									<div class="row" id="row1">
										<img src="@/assets/images/icon/monitor.png">
										<span class="description text">1号充电桩东北角</span>
									</div>
									<div class="row" id="row2">
										<span class="description time">20230826 12:24:06</span>
									</div>
								</div>
							</template>
						</template>
					</el-timeline-item>
					<el-timeline-item :timestamp="'通知及维护负责人'" placement="top" color="#1D9DFF">
						<template #dot>
							<div id="dot">
								<span class="description">2</span>
							</div>
						</template>
						<template #default>
							<span class="description text">刘某某，18765432110</span>
							<span class="description time">2023-07-21 14:51:20</span>
						</template>
					</el-timeline-item>
					<el-timeline-item :timestamp="'维护负责人到位'" placement="top" color="#1D9DFF">
						<template #dot>
							<div id="dot">
								<span class="description">3</span>
							</div>
						</template>
						<template #default>
							<span class="description time">2023-07-21 14:51:20</span>
						</template>
					</el-timeline-item>
					<el-timeline-item :timestamp="'处理现场问题'" placement="top" color="#1D9DFF">
						<template #dot>
							<div id="dot">
								<span class="description">4</span>
							</div>
						</template>
						<template #default>
							<span class="description time">2023-07-21 14:51:20</span>
						</template>
					</el-timeline-item>
					<el-timeline-item :timestamp="'确认现场照片'" placement="top" color="#1D9DFF">
						<template #dot>
							<div id="dot">
								<span class="description">5</span>
							</div>
						</template>
						<template #default>
						</template>
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
		<div class="item" id="rightDown-box">
			<span>注意事项</span>
			<span>刘某某</span>
			<span>15276500709</span>
		</div>
		<div class="item" id="left-box">
			<AppConsole
				@videoModelChange="videoBoxChanger"
			>
				<template #default="{ fn }">
					{{ _static.data.appConsoleSlot_fn = fn }}
				</template>
			</AppConsole>
		</div>
		<div id="big-video-box"
			v-if="_reactive.state.videoModel === 'big'"
		>
			<img 
				@click="() => videoBoxToSmall()"
				src="@/assets/images/icon/size-down.png">
			<img 
				@click="() => videoBoxToSmall()"
				src="@/assets/images/icon/close.png">
		</div>
	</div>
</template>

<script setup lang="ts">
	import AppConsole from '@/components/AppConsole.vue';

	import {
		onUnmounted,
		reactive
	} from 'vue';

	import {
		usePublish,
		useSubscribe
	} from '@/hooks/EventEmitter';

	const _reactive = reactive({
		state: {
			videoModel: 'small' as 'small' | 'big'
		}
	});

	const _static = {
		data: {
			appConsoleSlot_fn: null as null | (() => void)
		}
	};

	const videoBoxChanger = (
		model :'small' | 'big'
	) => {
		_reactive.state.videoModel = model;
	};

	const videoBoxToSmall = () => {
		_reactive.state.videoModel = 'small';
		_static.data.appConsoleSlot_fn &&
			_static.data.appConsoleSlot_fn();
	};

	usePublish('AppFooterModel', 'inside');
	usePublish('AppFooterState', true);

	usePublish('setIframerMsg', {
		ctid: 14011,
		state: "open"
	});

	onUnmounted(() => {
		usePublish('setIframerMsg', {
			ctid: 14011,
			state: "close"
		});
	});
</script>