<style lang="scss" scoped>
	.monitor-container {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;left: 0;
		pointer-events: none;
		& > .item {
			position: absolute;
			pointer-events: auto;
		}
		#total {
			width: 108px;
			height: 36px;
			top: 83px;
			right: 27px;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('@/assets/images/background/btn-1.png');
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
			img {
				pointer-events: none;
				width: 24px;
				height: 24px;
				object-fit: fill;
				margin-right: 4px;
				margin-left: 8px;
			}
			span {
				pointer-events: none;
				font-size: 14px;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #FFFFFF;
				text-shadow: 0px 1px 0px rgba(0,25,19,0.66);
			}
		}
	}

	.is-small {
		top: 129px;
		right: 27px;
		:deep(#body) {
			padding: 10px;
			box-sizing: border-box;
		}
	}
	.is-middle {
		top: 220px;
		right: 300px;
		:deep(#body > #left) {
			padding: 10px;
			box-sizing: border-box;
		}
	}

	#my-player {
		width: 100%;
		height: 100%;
		object-fit: fill;
	}
</style>

<template>
	<div class="monitor-container">
		<div class="item" id="total"
			v-if="_reatcive.state.totalBtn"
			@click="totalClickHandler"
		>
			<img src="@/assets/images/icon/monitor.png">
			<span>全部监控</span>
		</div>
		<component
			class="item video-target"
			:is="videoBox.target"
			:class="boxClassNameSetter"
			@enter-mulit="enterMulitHandler"
			@enter-signel="enterSignelHandler"
			@enter-small="enterSmallHandler"
			@enter-middle="enterMiddleHandler"
		></component>
		<BaseTeleportVideo
			v-if="_reatcive.state.telepVideo"
			:telep-target="_reatcive.data.teleportTarget"
			:device-info="_reatcive.data.deviceInfo"
		></BaseTeleportVideo>
	</div>
</template>

<script setup lang="ts">
	import BaseTeleportVideo from '@/components/BaseTeleportVideo.vue';

	import diff from '@/utils/diff';
	import Hunter from '@/utils/Hunter';

	import {
		videoBox,
		useChangeModle
	} from '@/hooks/videoBoxManager';

	import {
		usePlayerCreater
	} from '@/hooks/videoManager';

	import {
		getVideoAddress
	} from '@/api/default';

	import type{
		ctid_12821,
		DeviceInfo
	} from '@/types'; 

	import {
		usePublish,
		useSubscribe,
		useUnSubscribe
	} from '@/hooks/EventEmitter';

	import type {
		Component
	} from 'vue';

	import {
		watch,
		reactive,
		computed,
		onBeforeUnmount,
		nextTick,
		onMounted
	} from 'vue';

	const _reatcive = reactive({
		data: {
			zIndex: 1100,
			teleportTarget: undefined as string | undefined,
			videoBoxComp: undefined as undefined | Component,
			deviceInfo: undefined as undefined | DeviceInfo
		},
		state: {
			videoBoxModel: 1, // 0: close 1: small, 2: middle, 3: full, 
			totalBtn: true,
			video: false,
			telepVideo: true,
		}
	});

	const _static = {
		data: {
			player: null as null | any,
			subscribeIndex: undefined as undefined |number,
			deviceInfo: null as null | DeviceInfo,
			videoClickIndex: undefined as undefined | number
		},
		temp: [] as any[]
	};

	const videoBoxCompClassNameMapper = new Map<string, string>([
		['small', '.monitor-videoBox-small-container > #body'],
		['middle', '.monitor-videoBox-middle-container > #body > #left'],
		['full', '.monitor-videoBox-full-container > .item:nth-of-type(2) > .box:nth-of-type(1)'],
		['small-ext', '.monitor-videoBox-small-ext-container']
	])

	usePublish('AppHeaderL2State', false);
	usePublish('AppFooterModel', 'inside');
	usePublish('AppFooterState', true);
	useChangeModle('close');

	const enterMulitHandler = () => {
		_reatcive.state.telepVideo = false;
		_reatcive.data.teleportTarget = 'body';
	};

	const enterSignelHandler = () => {
		_reatcive.data.teleportTarget =
			videoBoxCompClassNameMapper.get(videoBox.value.type);
			_reatcive.state.telepVideo = true;
		_reatcive.data.deviceInfo = _static.temp[0];
	};

	const enterSmallHandler = () => {
		_reatcive.state.telepVideo = true;
		_reatcive.data.teleportTarget =
			videoBoxCompClassNameMapper.get(videoBox.value.type);
		_reatcive.data.deviceInfo = _static.temp[0];
	};

	const enterMiddleHandler = () => {
		_reatcive.state.telepVideo = true;
		_reatcive.data.teleportTarget =
			videoBoxCompClassNameMapper.get(videoBox.value.type);
		_reatcive.data.deviceInfo = _static.temp[0];
	};

	_static.data.subscribeIndex = useSubscribe<ctid_12821>('getIFramerMsg_12821', ctx => {
		diff<ctid_12821>(
			'ctid_12821', ctx,
			(oldValue, newVaule) => {
				if(
					oldValue.deviceSerial !== newVaule.deviceSerial ||
					oldValue.channelNo !== newVaule.channelNo
				) return true;
				return false;
			},
			(ctx) => {
				_static.temp[0] = ctx;
				if(videoBox.value.type !== 'small')
					useChangeModle('small');

				_reatcive.data.teleportTarget = videoBoxCompClassNameMapper.get(
					videoBox.value.type
				);
				_reatcive.data.deviceInfo = ctx;
			}
		);
	});

	useSubscribe<boolean>('monitorTotalBtnState', (ctx) => {
		_reatcive.state.totalBtn = ctx;
	})

	usePublish('setIframerMsg', {
		ctid: 12911,
		state: "open"
	});

	const totalClickHandler = () => {
		useChangeModle('full');
	};

	const boxClassNameSetter = computed(() => {
		if(videoBox.value.type === 'small')
			return 'is-small'
		if(videoBox.value.type === 'middle')
			return 'is-middle'
		return '';
	});

	onBeforeUnmount(() => {
		_reatcive.data.teleportTarget = undefined;

		if(_static.data.player) {
			_static.data.player.dispose();
		}

		usePublish('setIframerMsg', {
			ctid: 12911,
			state: "close"
		});
	});

	watch(() => videoBox.value.type, type => {
		if(type === 'close') {
			_reatcive.state.telepVideo = true;
		}

		_reatcive.data.teleportTarget =
			videoBoxCompClassNameMapper.get(type);
	})
</script>