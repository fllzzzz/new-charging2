<style lang="scss" scoped>
	.immediate-controller {
		--pace-width: 0;
	}
	.immediate-controller {
		pointer-events: none;
		position: fixed;
		width: 100vw;
		height: 100vh;
		.item {
			pointer-events: auto;
			position: absolute;
		}
		.card {
			width: 300px;
			background-repeat: no-repeat;
			background-size: contain;
		}
		.carrd.left {left: 20px;}
		.card.right {right: 20px;}
		#handle-list {
			top: 98px;
			height: 523px;
			background-image: url('@/assets/images/background/immcontroller-handle-list.png');
			span {
				font-size: 14px;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #00FFFF;
				position: absolute;
				top: 17px;
				left: 23px;
			}
			#timeline {
				width: 91%;
				height: 459px;
				position: absolute;
				top: 50px;
				left: 50%;
				transform: translateX(-50%);
				:deep(.el-timeline) {
					padding: 10px;
					.el-timeline-item {		
						.el-timeline-item__node {
							width: 7px;
							height: 7px;
							border-radius: 50%;
							margin-left: 2px;
						}
						.el-timeline-item__tail {
							border-left: 1px solid #00DB43;
						}
						.el-timeline-item__wrapper {
							
							.el-timeline-item__timestamp {
								font-size: 14px;
								font-family: DINPro;
								font-weight: 400;
								color: #FFFFFF;
								margin-bottom: 10px;
							}
							.el-timeline-item__content {
								#box {
									width: 100%;
									display: flex;
									flex-flow: row nowrap;
									justify-content: flex-start;
									align-items: flex-start;
									font-size: 14px;
									font-family: Source Han Sans CN;
									font-weight: 400;
									color: #FFFFFF;
									.graph#rect {
										width: 17px;
										height: 17px;
										background: #FF2A00;
										border-radius: 4px;
										font-size: 12px;
										font-family: DINPro;
										font-weight: 500;
										color: #FFFFFF;
										text-align: center;
										line-height: 17px;
										margin-right: 9px;
									}
								}
							}
						}
					}
				}
			}
		}
		#person {
			top: 641px;
			height: 246px;
			background-image: url('@/assets/images/background/immcontroller-person.png');
			span {
				font-size: 14px;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #00FFFF;
				position: absolute;
				top: 18px;
				left: 23px;
			}
			#content {
				width: 277px;
				height: 33px;
				background-color: transparent;
				background-image: url('@/assets/images/background/immcontroller-person-warn.png');
				background-repeat: no-repeat;
				background-size: contain;
				position: absolute;
				top: 64px;
				left: 12px;
				& > * {
					top: 50%;
					transform: translateY(-50%);
				}
				img {
					width: 22px;
					height: 22px;
					object-fit: contain;
					position: absolute;
					left: 23px;
					
				}
				span:nth-of-type(1) {
					font-size: 12px;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFDE00;
					position: absolute;
					left: 53px;
				}
				span:nth-of-type(2) {
					font-size: 12px;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					position: absolute;
					left: 90px;
				}
			}
			#text {
				position: absolute;
				top: 114px;
				left: 34px;
				width: 200px;
				span#title {
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
		}
		#handle-step {
			bottom: 93px;
			left: 20px;
			width: 1880px;
			height: 80px;
			background: rgba(0,29,41,0.5);
			border: 1px solid #00FFFF;
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			align-items: center;
			padding-left: 110px;
			padding-right: 110px;
			padding-top: 20px;
			box-sizing: border-box;
			.box {width: 100%;}
			.box:nth-of-type(1) {
				height: 42px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				align-items: center;
				.steps {
					* {
						pointer-events: none;
					}
					height: 100%;
					display: flex;
					flex-flow: column nowrap;
					justify-content: center;
					align-items: center;
					&::after {
						content: '';
						display: block;
						width: 17px;
						height: 10px;
						background-image: url('@/assets/images/icon/arrow.png');
						background-size: contain;
						background-repeat: no-repeat;
						position: absolute;
						transform: translateX(550%);
					}
					&:nth-of-type(2)::after {
						transform: translateX(650%);
					}
					&:nth-of-type(3)::after {
						transform: translateX(750%);
					}
					&:nth-of-type(4)::after {
						transform: translateX(750%);
					}
					&:nth-of-type(5)::after {
						transform: translateX(750%);
					}
					&:nth-of-type(6)::after {
						transform: translateX(1000%);
					}
					&:nth-of-type(7)::after {
						display: none;
					}
					span:nth-of-type(1) {
						font-size: 18px;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #00FFFF;
					}
					#timer {
						span {
							font-size: 14px;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #A2FF00;
						}
					}
				}
				.steps.active {
					&::after {
						background-image: url('@/assets/images/icon/arrow_active.png');
					}
				}
			}
			.box:nth-of-type(2) {
				height: 6px;
				background: rgba(20,111,5,0.24);
				border: 1px solid #A2FF00;
				opacity: 0.42;
				#inner {
					width: calc(var(--pace-width) * 1px);
					height: 6px;
					background-color: #94E70D;
				}
			}
		}
		:deep(.immediate-card) {
			.el-dialog {
				top: 379px;
				left: 791px;
			}
		}
		#header-controller {
			width: 1242px;
			height: 64px;
			background-color: transparent;
			background-image: url('@/assets/images/background/immcontroller-main-header.png');
			background-repeat: no-repeat;
			background-size: contain;
			top: 98px;
			left: 339px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
			#total-time {
				width: 165px;
				height: 19px;
				font-size: 20px;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #FF5400;
				line-height: 26px;
				margin-left: 118px;
			}
			#content {
				width: 418px;
				height: 19px;
				font-size: 20px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #00FFFF;
				line-height: 26px;
				margin-left: 31px;
				span {
					margin-left: 10px;
				}
			}
			#close {
				width: 30px;
				height: 32px;
				background-image: url('@/assets/images/icon/close-2.png');
				background-repeat: no-repeat;
				background-size: contain;
				margin-left: 400px;
			}
		}
		#left-box {
			width: 300px;
			height: 789px;
			left: 20px;
			top: 98px;
		}
	}
</style>

<template>
	<div class="container immediate-controller" :style="getRootStyle">
		<div class="item card right" id="handle-list">
			<span class="description">处理步骤</span>
			<div id="timeline">
				<el-timeline>
					<el-timeline-item
						:timestamp="new Date().toLocaleString()"
						placement="top"
						color="#00DB43"
					>
						<div id="box">
							<div class="graph" id="rect">5</div>
							已开启消防炮
						</div>
					</el-timeline-item>
					<el-timeline-item
						:timestamp="new Date().toLocaleString()"
						placement="top"
						color="#00DB43"
					>
						<div id="box">
							<div class="graph" id="rect">4</div>
							由值班长断开3区2号充电桩上级电源
						</div>
					</el-timeline-item>
					<el-timeline-item
						:timestamp="new Date().toLocaleString()"
						placement="top"
						color="#00DB43"
					>
						<div id="box">
							<div class="graph" id="rect">3</div>
							由值班长执行3区2号充电桩应急预案已启动
						</div>
					</el-timeline-item>
					<el-timeline-item
						:timestamp="new Date().toLocaleString()"
						placement="top"
						color="#00DB43"
					>
						<div id="box">
							<div class="graph" id="rect">2</div>
							3区2号充电桩感温电缆1火灾确认为火灾
						</div>
					</el-timeline-item>
					<el-timeline-item
						:timestamp="new Date().toLocaleString()"
						placement="top"
						color="#00DB43"
					>
						<div id="box">
							<div class="graph" id="rect">1</div>
							3区2号充电桩感温电缆1火灾确认指派消息已发送
						</div>
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
		<div class="item card right" id="person">
			<span class="description">值班人员</span>
			<div id="content">
				<img src="@/assets/images/background/immcontroller-person-warn.png">
				<span class="description">注意</span>
				<span class="description">拨打报警电话</span>
			</div>
			<div id="text">
				<span class="description" id="title">消防大队 119</span>
			</div>
		</div>
		<div class="item" id="handle-step">
			<div class="box" @click="handleStepClickHandler">
				<div class="steps" id="step-1" :class="setStepsStyle(0)">
					<span class="description">确认灾情</span>
					<div id="timer" v-if="state.handleStep[0] === 1">
						<span class="description" v-once>
							{{ new Date().toLocaleTimeString() }}
						</span>
					</div>
				</div>
				<div class="steps" id="step-2" :class="setStepsStyle(1)">
					<span class="description">拨打报警电话</span>
					<div id="timer" v-if="state.handleStep[1] === 1">
						<span class="description" v-once>
							{{ new Date().toLocaleTimeString() }}
						</span>
					</div>
				</div>
				<div class="steps" id="step-3" :class="setStepsStyle(2)">
					<span class="description">现场负责人员到位</span>
					<div id="timer" v-if="state.handleStep[2] === 1">
						<span class="description" v-once>
							{{ new Date().toLocaleTimeString() }}
						</span>
					</div>
				</div>
				<div class="steps" id="step-4" :class="setStepsStyle(3)">
					<span class="description">消防车辆设备到位</span>
					<div id="timer" v-if="state.handleStep[3] === 1">
						<span class="description" v-once>
							{{ new Date().toLocaleTimeString() }}
						</span>
					</div>
				</div>
				<div class="steps" id="step-5" :class="setStepsStyle(4)">
					<span class="description">确认明火扑灭</span>
					<div id="timer" v-if="state.handleStep[4] === 1">
						<span class="description" v-once>
							{{ new Date().toLocaleTimeString() }}
						</span>
					</div>
				</div>
				<div class="steps" id="step-6" :class="setStepsStyle(5)">
					<span class="description">消防指挥权交接现场负责人员</span>
					<div id="timer" v-if="state.handleStep[5] === 1">
						<span class="description" v-once>
							{{ new Date().toLocaleTimeString() }}
						</span>
					</div>
				</div>
				<div class="steps" id="step-7" :class="setStepsStyle(6)">
					<span class="description">应急处置结束</span>
					<div id="timer" v-if="state.handleStep[6] === 1">
						<span class="description" v-once>
							{{ new Date().toLocaleTimeString() }}
						</span>
					</div>
				</div>
			</div>
			<div class="box">
				<div id="inner"></div>
			</div>
		</div>
		<div class="item" id="left-box">
			<AppConsole></AppConsole>
		</div>
		<template v-if="state.cardDialogOpen">
			<ImmedaiteControllerCard
				:dialogOpen="state.cardDialogOpen"
				:currentStep="dataBase.immedaiteCardCurrentStep"
				@confirm="immedaiteCardConfirmHandler"
				@closed="immedaiteCardClosedHandler"
			>
				<template #text>
					{{ dataBase.immedaiteCardText }}
				</template>
			</ImmedaiteControllerCard>
		</template>
		<template v-if="state.headerControllershow">
			<div class="item" id="header-controller">
				<div class="box text" id="total-time">
					<span class="description">耗时时间：</span>
					<span class="description">{{ getTotalTime('hour') }}时{{ getTotalTime('minute') }}分</span>
				</div>
				<div class="box text" id="content">
					<span class="description">{{ dataBase.currentTime }}</span>
					<span class="description">2区6号充电桩发生火灾！</span>
				</div>
				<div class="box btn" id="close" @click="closeIconClickHandler"></div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
	import AppConsole from '@/components/AppConsole.vue';
	import ImmedaiteControllerCard from '@/components/ImmedaiteControllerCard.vue';

	import {
		usePublish,
		useSubscribe
	} from '@/hooks/EventEmitter';

	import {
		ref,
		computed,
	} from 'vue';

	import {
		useRouter
	} from 'vue-router'

	const router = useRouter();
	
	const dataBase = ref({
		rootStyle: {
			'--pace-width': 0
		},
		immedaiteCardText: '',
		immedaiteCardCurrentStep: undefined as undefined | string,
		station: undefined as undefined | number,
		id: undefined as undefined | number,
		calamityModel: undefined as undefined | string,
		mpegtsPlayer: null as null | any,
		deviceInfo: null as null | any,
		totalTime: 0,
		currentTime: undefined as undefined | string
	});

	const state = ref({
		handleStep: [0,0,0,0,0,0,0],
		cardDialogOpen: false,
		CloudControllerShow: true,
		monitorDeviceListshow: true,
		upsizeVideoPlayerShow: false,
		headerControllershow: false,
		handleStepClickStateList:[0,0,0,0,0,0,0]
	});

	const loopTimer = ref({
		setTotalTime: undefined as undefined | number,
	});

	enum stepsData {
		'step-1' = '0,75',
		'step-2' = '1,304',
		'step-3' = '2,571',
		'step-4' = '3,837',
		'step-5' = '4,1067',
		'step-6' = '5,1428',
		'step-7' = '6,1658',
	}

	usePublish('AppFooterModel', 'inside');
	usePublish('AppFooterState', true);

	const getRootStyle = computed(() => {
		return dataBase.value.rootStyle;
	});

	const setStepsStyle = computed(() => {
		return (id :number) => {
			if (state.value.handleStep[id] === 1) {
				return 'active';
			}else {
				return '';
			}
		};
	});

	const setTotalTime = () => {
		loopTimer.value.setTotalTime = setInterval(() => {
			dataBase.value.totalTime++;
		},60000);
	};

	const getTotalTime = computed(() => {
		let minute = 0;
		let hour = 0;
		return (param :string) => {
			if(dataBase.value.totalTime >= 60) {
				minute = 60 - dataBase.value.totalTime;
				dataBase.value.totalTime = 0;
				hour++;
				switch(param){
					case "minute":
						return minute;
					case "hour":
						return hour;
					default:
						return 0;
				}
			}else {
				minute = dataBase.value.totalTime;
				switch(param){
					case "minute":
						return minute;
					case "hour":
						return hour;
					default:
						return 0;
				}
			}
		};
	});

	const closeIconClickHandler = () => {
		router.push({path: '/overview'});
	};

	const handleStepClickHandler = (() => {
		let el :HTMLElement;
		return (e :MouseEvent) => {
			el = e.target as HTMLElement;
			if(el.id !== '') {
				switch(el.id) {
					case 'step-1':	/* 确认灾情 */
						if(state.value.handleStepClickStateList[0] === 0) {
							immedaiteCardOpeningHandler(el.id,'确认2区6号充电桩发生火灾？');
						}
						state.value.handleStepClickStateList[0] = 1;
						break;
					case 'step-2':	/* 报警电话 */
						if(state.value.handleStepClickStateList[1] === 0) {
							immedaiteCardOpeningHandler(el.id,'是否拨打报警电话？');
						}
						state.value.handleStepClickStateList[1] = 1;
						break;
					case 'step-3':	/* 人员到位 */
						if(state.value.handleStepClickStateList[2] === 0) {
							immedaiteCardOpeningHandler(el.id,'现场负责人员是否到位？');
						}
						state.value.handleStepClickStateList[2] = 1;
						break;
					case 'step-4':	/* 设备到位 */
						if(state.value.handleStepClickStateList[3] === 0) {
							immedaiteCardOpeningHandler(el.id,'消防车辆设备是否到位？');
						}
						state.value.handleStepClickStateList[3] = 1;
						break;
					case 'step-5':	/* 明火扑灭 */
						if(state.value.handleStepClickStateList[4] === 0) {
							immedaiteCardOpeningHandler(el.id,'确认明火是否扑灭？');
						}
						state.value.handleStepClickStateList[4] = 1;
						break;
					case 'step-6':	/* 交接 */
						if(state.value.handleStepClickStateList[5] === 0) {
							immedaiteCardOpeningHandler(el.id,'是否将指挥权交接于现场工作人员？');
						}
						state.value.handleStepClickStateList[5] = 1;
						break;
					case 'step-7':	/* 结束 */
						if(state.value.handleStepClickStateList[6] === 0) {
							immedaiteCardOpeningHandler(el.id,'应急处置是否结束？');
						}
						state.value.handleStepClickStateList[6] = 1;
						break;
				}
			}
		};
	})();

	const immedaiteCardOpeningHandler = (step :string, text :string) => {
		dataBase.value.immedaiteCardCurrentStep = step;
		dataBase.value.immedaiteCardText = text;
		state.value.cardDialogOpen = true;
	};

	const immedaiteCardConfirmHandler = (() => {
		let data :string[];
		return (step :keyof typeof stepsData ) => {
			console.log('jx-clg',stepsData[step]);
			data = stepsData[step].split(',');
			state.value.handleStep[parseInt(data[0])] = 1;
			dataBase.value.rootStyle['--pace-width'] = parseInt(data[1]);
			state.value.headerControllershow = true;
			dataBase.value.currentTime = new Date().toLocaleString();
			setTotalTime();
		};
	})();

	const immedaiteCardClosedHandler = () => {
		state.value.cardDialogOpen = false;
	};
</script>