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
					height: 160px;
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
							display: flex;
							justify-content: center;
							align-items: center;
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
									display: unset;
									margin-top: 10px;
									margin-bottom: 6px;
									span {
										line-height: unset;
										&.is-error {
											color: red;
										}
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

	.is-small {
		position: fixed;
		top: 129px;
		left: 27px;
		:deep(#body) {
			padding: 10px;
			box-sizing: border-box;
		}
	}
	.is-middle {
		position: fixed;
		top: 220px;
		left: 100px;
		:deep(#body > #left) {
			padding: 10px;
			box-sizing: border-box;
		}
	}

	.editor-box {
		pointer-events: auto;
		position: fixed;
		bottom: 10px;
		left: 0;
		width: 100vw;
		height: 91px;
	}

	.load-failed {
		color: red;
	}
</style>

<template>
	<div class="inspectReport-video-container">
		<div class="item" id="header">
			<div id="title">
				<img src="@/assets/images/icon/report.png">
				<span>巡检报告</span>
			</div>
			<img src="@/assets/images/icon/close.png"
				@click="closeHandler"
			>
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
									<template
										v-if="item.image"
									>
										<img :src="item.image">
									</template>
									<template v-else>
										<span
											class="load-failed"
										>加载失败</span>
									</template>
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
												<img :src="btn.image" :id="btn.name"
													v-if="! (btn.name === 'editor' && props.dispableEditor)"
													@click="() => optionsHandler(btn.name, item)"
												>	
											</template>
										</div>
									</div>
									<div class="row">
										<template
											v-for="content,index in contentGetter(item.keyWord)"
											:key="index"
										>
											<span 
												:class="content.state === 1 ? 'is-error' : ''"
												id="main-text"
											>
												<template
													v-if="content.length -1  === index">
													{{ content.data + '。' }}
												</template>
												<template v-else>
													{{ content.data + ' , ' }}
												</template>
											</span>
										</template>
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
		<InspectEditorVideo
			v-if="_reactive.state.editorBox"
			class="editor-box"
			model='editor'
			:device-info="_reactive.data.device"
			:report-id="inspectReportId"
			:btn-state="_reactive.data.reportBtnState"
			@destory="editorDestoryHandler"
			@editor-change="editorChanger"
		></InspectEditorVideo>
	</div>
</template>

<script setup lang="ts">
	import InspectEditorVideo from './InspectEditorVideo.vue';

	import {
		useRoute
	} from 'vue-router';

	import {
		useReportUpdater,
		useReportMaker
	} from '@/store/videoReport';

	import {
		useInspectReportMaker
	} from '@/hooks/InspectManager';

	import {
		getInspectVideoReport
	} from '@/api/default';

	import {
		inspectReportId
	} from '@/store';

	import type {
		DeviceInfo
	} from '@/types';

	import {
		reactive,
		onMounted,
		watch
	} from 'vue';

	type ReportList = {
		id :number,
		deviceInfo :DeviceInfo,
		title :string,
		image :string;
		keyWord :string[];
	};

	const props = defineProps({
		dispableEditor: {
			type: Boolean,
			required: false,
			default: false
		}
	});

	const route = useRoute();

	const emits = defineEmits(['close', 'monitor', 'editor']);

	const _reactive = reactive({
		state: {
			editorBox: false
		},
		data: {
			reportBtnState: {
				next: 0,
				preset: 0
			},
			device: {} as DeviceInfo,
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
			reportList: [] as ReportList[],
		}
	});

	const editorDestoryHandler = () => {
		_reactive.state.editorBox = false;
		_reactive.data.reportBtnState.next = 1;
		_reactive.data.reportBtnState.preset = 1;
	};

	const editorNextHandler = (() => {
		/* let _device :DeviceInfo | undefined; */

		const _device = new Proxy({
			d: undefined as undefined | DeviceInfo
		}, {
			get(target, p, receiver) {
				const index = _reactive.data.reportList.findIndex(item => {
					if(
						target.d?.channelNo === item.deviceInfo.channelNo &&
						target.d?.deviceSerial === item.deviceInfo.deviceSerial
					) return true;
				})

				if(index === 0) {
					_reactive.data.reportBtnState.next = 1;
					_reactive.data.reportBtnState.preset = 0;
				}else if (index === _reactive.data.reportList.length - 1) {
					_reactive.data.reportBtnState.next = 0;
					_reactive.data.reportBtnState.preset = 1;
				}else {
					_reactive.data.reportBtnState.next = 1;
					_reactive.data.reportBtnState.preset = 1;
				}
				return Reflect.get(target, p, receiver);
			},
			set(target, p, newValue, receiver) {
				Reflect.set(target, p, newValue);

				const index = _reactive.data.reportList.findIndex(item => {
					if(
						target.d?.channelNo === item.deviceInfo.channelNo &&
						target.d?.deviceSerial === item.deviceInfo.deviceSerial
					) return true;
				})
				
				if(index === 0) {
					_reactive.data.reportBtnState.next = 1;
					_reactive.data.reportBtnState.preset = 0;
				}else if (index === _reactive.data.reportList.length - 1) {
					_reactive.data.reportBtnState.next = 0;
					_reactive.data.reportBtnState.preset = 1;
				}else {
					_reactive.data.reportBtnState.next = 1;
					_reactive.data.reportBtnState.preset = 1;
				}

				return true;
			},
		});

		function finder(
			device :DeviceInfo | undefined
		) :number | undefined {
			if(! device) return;
			const index = _reactive.data.reportList.findIndex(item => {
				if(
					item.deviceInfo.channelNo === device.channelNo &&
					item.deviceInfo.deviceSerial === device.deviceSerial
				) return true;
			});

			if(
				(index && index === -1) ||
				(! index && index !== 0) 
			) return;

			return index;
		}

		function next(
			index :number | undefined
		) :DeviceInfo | undefined {
			if(! index && index !== 0) return;
			if(index + 1 < _reactive.data.reportList.length) {
				_device.d = _reactive.data.reportList[index + 1].deviceInfo;
				return _reactive.data.reportList[index + 1].deviceInfo;
			}
			return undefined;
		}

		function preset(
			index :number | undefined
		) :DeviceInfo | undefined {
			if(! index && index !== 0) return;
			if(index - 1 >= 0) {
				_device.d = _reactive.data.reportList[index - 1].deviceInfo;
				return _reactive.data.reportList[index - 1].deviceInfo;
			}
			return undefined;
		}

		return (
			model :'next' | 'preset' | 'push',
			device? :DeviceInfo
		) => {
			switch(model){
				case 'next':
					return next(finder(_device.d));
				case 'preset':
					return preset(finder(_device.d));
				case 'push':
					_device.d = device;
			}
		};
	})();

	const editorChanger = (model :'next' | 'preset') => {
		const u = editorNextHandler(model);
		if(! u) return;
		_reactive.data.device = u;
	};

	const optionsHandler = (
		name :string,
		...args :any[]
	) => {
		if(name === 'monitor') emits('monitor', (args[0] as ReportList).deviceInfo);
		if(name === 'editor') {
			_reactive.state.editorBox = true;
			_reactive.data.device = (args[0] as ReportList).deviceInfo;
			editorNextHandler('push', (args[0] as ReportList).deviceInfo);
		}
	};

	const closeHandler = () => {
		emits('close');
	};

	const contentGetter = (
		list :string[]
	) => {
		const u = useInspectReportMaker(list.slice(0, list.length));
		return u.map(item => {
			return {
				length: u.length,
				...item
			}
		})
	};
	
	const Init = () => {
		if(! inspectReportId.value) return;
		return getInspectVideoReport(inspectReportId.value).then(result => {
			return result.cameraList.map<ReportList>((device, index) => {
				return {
					id: index,
					deviceInfo: device,
					title: device.deviceSerial + '@' + device.channelNo,
					image: result.picList[index],
					keyWord: result.unnormalReportContent[index]
				}
			})
		});
	};

	useReportUpdater((ctx) => {
		const target = _reactive.data.reportList.find(item => {
			if(
				item.deviceInfo.channelNo === ctx.device.channelNo &&
				item.deviceInfo.deviceSerial === ctx.device.deviceSerial
			) return true;
		});
		if(! target) return;
		target.keyWord = ctx.keyWords;
	});

	onMounted(() => {
		const {path} = route;
		if(path.search(new RegExp('(video)|(digital)')) !== -1) {
			useReportMaker((ctx) => {
				_reactive.data.reportList = ctx;
			});
		}else {
			Init()?.then(result => {
				_reactive.data.reportList = result;
			})
		}
	});
</script>