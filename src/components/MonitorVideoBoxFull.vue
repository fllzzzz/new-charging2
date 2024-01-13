<style lang="scss" scoped>
	.monitor-videoBox-full-container {
		width: 100vw;
		height: 100vh;
		background-color: #010a0fFF;
		position: fixed;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: center;
		video {
			width: 100% !important;
			height: 100% !important;
			object-fit: fill !important;
		}

		& > .item {
			box-sizing: border-box;
			width: 1883px;
			&:first-child {
				margin-top: 100px;
				height: 24px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				align-items: center;
				.box {
					height: 100%;
				}
				@for $i from 1 to 4 {
					@if $i == 1 {
						.box:nth-of-type(#{$i}) {
							width: 102px;
							display: flex;
							flex-flow: row nowrap;
							justify-content: space-between;
							align-items: center;
							img {
								width: 24px;
								height: 24px;
								object-fit: contain;
								margin-right: 7px;
							}
							span {
								font-size: 16px;
								font-family: Source Han Sans CN;
								font-weight: 500;
								color: #00FFFF;
								line-height: 34px;
							}
						}
					}
					@if $i == 2 {
						.box:nth-of-type(#{$i}) {
							pointer-events: none;
							flex: 1;
							display: flex;
							flex-flow: row nowrap;
							justify-content: flex-end;
							align-items: center;
							img.target {
								pointer-events: auto;
								width: 24px;
								height: 24px;
								object-fit: contain;
								margin-left: 6px;
								&:first-child {
									margin-left: 0;
								}
							}
						}
					}
					@if $i == 3 {
						.box:nth-of-type(#{$i}) {
							margin-left: 325px;
							margin-bottom: 12px;
							width: 32px;
							height: 32px;
							img {
								width: 100%;
								height: 100%;
								object-fit: contain;
							}
						}
					}
				}
			}
			&:last-child {
				height: 945px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: flex-start;
				.box {
					height: 100%;
					background-repeat: no-repeat;
					background-size: 100% 100%;
					box-sizing: border-box;
					@for $i from 1 to 3 {
						@if $i == 1 {
							&:nth-of-type(#{$i}) {
								height: 947px;
								width: 1526px;
								background-image: url('@/assets/images/background/videoBox-full-body-left.png');
								display: flex;
								flex-direction: row;
							}
						}
						@if $i == 2 {
							&:nth-of-type(#{$i}) {
								flex: 1;
								background-image: url('@/assets/images/background/videoBox-full-body-right.png');
								display: flex;
								flex-flow: column nowrap;
								justify-content: flex-start;
								align-items: flex-start;
								& > .block {
									width: 100%;
									box-sizing: border-box;
								}
								& > .block:nth-of-type(1) {
									height: 575px;
									border-bottom: 1px solid #219E99;
									padding-top: 16px;
									padding-left: 16px;
									display: flex;
									flex-flow: row nowrap;
									justify-content: center;
									align-items: flex-start;
								}
								& > .block:nth-of-type(2) {
									flex: 1;
									padding: 16px 0 0 16px;
									display: flex;
									flex-flow: row nowrap;
									justify-content: center;
									align-items: flex-start;
								}
							}
						}
					}
				}
			}
		}
	}

	.video-player-box {
		width: 50%;
		height: 474px;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('@/assets/images/background/video-box1.png');
		padding: 8px 6px 8px 8px;
		z-index: 10;
		:deep(video) {
			width: 100%;
			height: 100%;
			object-fit: fill;
			position: unset;
		}
	}

	:deep(.is-shadow) {
		width: 99%;
		height: 99%;
		position: absolute;
		top: 50%;left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
		box-sizing: border-box;
		box-shadow: inset 0px 0px 20px 0px #00FFFF;
	}

	:deep(.el-loading-container) {
		pointer-events: none;
	}

	.is-signel {
		padding: 10px;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
	}

	.is-mulit {
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
	}
</style>

<template>
	<div class="monitor-videoBox-full-container">
		<div class="item">
			<div class="box">
				<img src="@/assets/images/icon/monitor-1.png">
				<span>全部监控</span>
			</div>
			<div class="box"
				@click="clickDispensere"
			>
				<template
					v-for="target in _reactive.data.targetList"
					:key="target.id"
				>
					<img
						class="target"
						:id="target.name"
						:src="target.imageList[0]"
						:draggable="false"
					>
				</template>
			</div>
			<div class="box">
				<img src="@/assets/images/icon/close.png"
					@click="closeHandler"
				>
			</div>
		</div>
		<div class="item">
			<div class="box"
				:class="getLeftBoxClassName"
			>
				<template 
					v-if="_reactive.state.model === 'mulit'"
				>
					<template
						v-for="id, index in _reactive.data.playerList"
						:key="index"
					>
						<video :id="id"></video>
					</template>
				</template>
			</div>
			<div class="box">
				<div class="block">
					<AppDeviceList
						@select="deviceListSelector"
					></AppDeviceList>
				</div>
				<div class="block">
					<AppCloudController
						:config="cloudControllerDevice"
					></AppCloudController>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import AppCloudController from './AppCloudController.vue';
	import AppDeviceList from './AppDeviceList.vue';

	import Hunter from '@/utils/Hunter';

	import {
		useChangeModle
	} from '@/hooks/videoBoxManager';

	import {
		usePlayerCreater
	} from '@/hooks/videoManager';

	import {
		getVideoAddress
	} from '@/api/default';

	import {
		usePoolGetter
	} from '@/hooks/deviceService';

	import {
		useCompStateChanger
	} from '@/hooks/compController';

	import {
		usePublish
	} from '@/hooks/EventEmitter';

	import {
		ref,
		reactive,
		computed,
		nextTick,
		watchEffect,
		onBeforeUnmount,
		PropType
	} from 'vue';

	import {
		MonitorVideoBox,
		DeviceInfo
	} from '@/types';
	import Player from 'video.js/dist/types/player';


	type DeviceContext = DeviceInfo & {
		id :number;
		name :string;
		state :number;
	};

	interface Config {
		player :Player
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>
		}
	});

	
	const _reactive = reactive({
		data: {
			playerList: [
				'my-player-1',
				'my-player-2',
				'my-player-3',
				'my-player-4',
			],
			targetList: [
				{
					id :1,
					name: 'to-small',
					state: 0,
					imageList: [
						require<string>('@/assets/images/icon/to-small.png'),
						require<string>('@/assets/images/icon/to-small_active.png'),
					]
				},
				{
					id :2,
					name: 'to-middle',
					state: 0,
					imageList: [
						require<string>('@/assets/images/icon/to-middle.png'),
						require<string>('@/assets/images/icon/to-middle_active.png'),
					]
				},
				{
					id :3,
					name: 'to-signel',
					state: 0,
					imageList: [
						require<string>('@/assets/images/icon/to-signel.png'),
						require<string>('@/assets/images/icon/to-signel_active.png'),
					]
				},
				{
					id :4,
					name: 'to-mulit',
					state: 0,
					imageList: [
						require<string>('@/assets/images/icon/to-mulit.png'),
						require<string>('@/assets/images/icon/to-mulit_active.png'),
					]
				},
			] 
		},
		state: {
			model: 'signel' as 'signel' | 'mulit',
		}
	});

	const _static = {
		data: {
			deviceList: [] as DeviceContext[],
			playerList: [] as any[],
			videoClickIndex: undefined as undefined | number
		}
	};


	const init0 = () => {
		
		const target = _reactive.data.targetList.find(
			target => target.name === 'to-signel'
		);

		if(! target) return;

		[target.imageList[0], target.imageList[1]] = 
						[target.imageList[1], target.imageList[0]];

		Hunter(() => usePoolGetter<DeviceContext[]>('onlineList'), {
			frequency: 200,
			cycle: 50
		}).then(deviceList => {
			_static.data.deviceList = deviceList;
			const device = {
				deviceSerial: deviceList[0].deviceSerial,
				channelNo: deviceList[0].channelNo
			} as DeviceInfo;

			originDeviceList.push(device);

			console.log('@full', device);

			getVideoAddress(device).then(url => {
				config.value?.player.src({
					type: "video/flv",
					src: url
				});
			}).catch(err => console.log(err))
		}).catch(err => console.log(err))
	}

	const config = ref<Config | undefined>();

	watchEffect(() => {
		config.value = props.config;

		if(
			config.value?.player &&

			// @ts-ignore
			! config.value?.player.src()
		) init0()
	});

	const emits = defineEmits([
		'close',
		'enter-mulit',
		'enter-signel',
		'enter-small',
		'enter-middle'
	]);

	const originDeviceList :any = [];
	const cloudControllerDevice = ref<DeviceInfo | undefined>();

	usePublish('monitorTotaltargetState', false);

	useCompStateChanger('AppSmartGuard', false);
	useCompStateChanger('AppFooter', false);

	const getLeftBoxClassName = computed(() => {
		if(_reactive.state.model === 'signel') return 'is-signel';
		if(_reactive.state.model === 'mulit') return 'is-mulit';
		return '';
	});

	const deviceListSelector = (device :DeviceInfo) => {
		if(_static.data.videoClickIndex) {
			if(!_static.data.playerList[_static.data.videoClickIndex!]) return;
			getVideoAddress(device).then(url => {
				_static.data.playerList[_static.data.videoClickIndex!].src({
					type: "video/flv",
					src: url
				});
			}).catch(err => console.log(err))
		}else {
			if(!_static.data.playerList[0]) return;
			getVideoAddress(device).then(url => {
				_static.data.playerList[0].src({
					type: "video/flv",
					src: url
				});
			}).catch(err => console.log(err))
		}
	};

	const getAllVideoAddress = async (
		deviceList :DeviceInfo[]
	) => {
		const _arr :Promise<string>[]= [];

		deviceList.forEach(device => {
			_arr.push(getVideoAddress(device));
		});

		return await Promise.allSettled(_arr).then(list => {
			return list.map(item => {
				if(item.status === 'rejected') return null;
				return item.value;
			})
		});
	};
	
	const videoClickHandler = (event :MouseEvent) => {
		const id = (event.target as HTMLElement).id;
		const index = _reactive.data.playerList.findIndex(item => {
			if(item + '_flvjs_api' === id) return true;
		});
		if(
			index > -1 &&
			index !== _static.data.videoClickIndex
		) {
			_static.data.videoClickIndex = index;
		} else {
			_static.data.videoClickIndex = undefined;
		}

		cloudControllerDevice.value = 
			originDeviceList[_static.data.videoClickIndex ?? 0];
		const pEl = (event.target as HTMLElement).parentElement?.parentElement;
		if(!pEl) return;
		for(let i=0; i<pEl.children.length; i++) {
			if(event.target === pEl.children[i].children[0]) {
				pEl.children[i].children.namedItem('modal-shadow')!.classList.add('is-shadow');
			}else {
				pEl.children[i].children.namedItem('modal-shadow')!.classList.remove('is-shadow');
			}
		}
	};

	const mulitModelHandler = () => {
		Hunter(() => usePoolGetter<DeviceContext[]>('onlineList'), {
			frequency: 200,
			cycle: 50
		}).then(deviceList => {
			_static.data.deviceList = deviceList;
			const _arr = deviceList.map(device => {
				return {
					deviceSerial: device.deviceSerial,
					channelNo: device.channelNo
				} as DeviceInfo;
			});

			originDeviceList.push(..._arr);
			console.log('@cloud', originDeviceList);

			getAllVideoAddress(_arr).then(urlList => {
				_reactive.data.playerList.forEach((elVideoId, index) => {
					if(! urlList[index]) return;
					usePlayerCreater(elVideoId,{
						userActions: {
							doubleClick: false
						}
					},(player) => {
						player.on('click', videoClickHandler);
						player.addClass('video-player-box');
						const elModalShadow = document.createElement('div', {
								is: 'custom-element',
						});
						elModalShadow.id = 'modal-shadow'
						player.el().appendChild(elModalShadow);
					}).then(player => {
						_static.data.playerList.push(player);
						player.src({
							type: "video/flv",
							src: urlList[index]!
						});
					})
				});
			}).catch(err => console.log(err))
		}).catch(err => console.log(err))
	};

	const clickEventInovke = new Map<string[], ((
		...args :any[]
	) => void)>([
		[Array.from(_reactive.data.targetList, target => target.name), (...args) => {
			const id = args[0] as string;
			const oldHeightLightElements = 
				_reactive.data.targetList.filter(target => {
					if (target.state === 1) {
						target.state = 0;
						return true;
					}
				});

			if(oldHeightLightElements && oldHeightLightElements.length > 0) {
				oldHeightLightElements.forEach(target => {
					[target.imageList[0], target.imageList[1]] = 
						[target.imageList[1], target.imageList[0]];
				})
			}

			_reactive.data.targetList.find(target => {
				if(target.name === id) {
					[target.imageList[0], target.imageList[1]] = 
						[target.imageList[1], target.imageList[0]];
					target.state = 1;
				}
			});

			switch(id) {
				case 'to-small':
					useChangeModle('small');
					usePublish('monitorTotaltargetState', true);
					usePublish('AppFooterModel', 'inside');
					useCompStateChanger('AppFooter', true);
					emits('enter-small');
					break;
				case 'to-middle':
					useChangeModle('middle');
					usePublish('monitorTotaltargetState', true);
					usePublish('AppFooterModel', 'inside');
					useCompStateChanger('AppFooter', true);
					emits('enter-middle');
					break;
				case 'to-mulit':
					_static.data.playerList.forEach(
						player => player.dispose()
					);
					_static.data.playerList.length = 0;
					_reactive.state.model = 'mulit';
					emits('enter-mulit')
					nextTick(() => {
						mulitModelHandler();
					});
					break;
				case 'to-signel':
					_static.data.playerList.forEach(
						player => player.dispose()
					);
					_static.data.playerList.length = 0;
					_reactive.state.model = 'signel';
					emits('enter-signel');
					break;
			}
		}]
	]);

	const clickDispensere = (event :MouseEvent) => {
		const id = (event.target as HTMLElement).id;
		for (let i of clickEventInovke) {
			if(i[0].includes(id)) {
				i[1](id);
				return;
			}
		}		
	};

	const closeHandler = () => {
		useChangeModle('close');
		useCompStateChanger('AppSmartGuard', true);
		usePublish('AppFooterModel', 'inside');
		useCompStateChanger('AppFooter', true);
		usePublish('monitorTotaltargetState', true);
	};

	onBeforeUnmount(() => {
		_static.data.deviceList.length =0;
		_static.data.videoClickIndex = undefined;
		_static.data.playerList.forEach(player => {
			player.dispose();
		})
	});
</script>