<style lang="scss" scoped>
	.monitor-container {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;left: 0;
		pointer-events: none;
		z-index: v-bind('_reatcive.data.zIndex');
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
	}
	.is-middle {
		top: 220px;
		right: 300px;
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
			:is="_reatcive.data.videoBoxComp"
			:class="boxClassNameSetter"
		></component>
		<Teleport
			:to="_reatcive.data.teleportTarget"
		>
			<video
				id="my-player"
				v-show="_reatcive.state.video"
			></video>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
	import diff from '@/utils/diff';
	import Hunter from '@/utils/Hunter';

	import {
		videoBox
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
		onUnmounted,
		nextTick,
		onMounted
	} from 'vue';

	const _reatcive = reactive({
		data: {
			zIndex: 1100,
			teleportTarget: 'body' as string | HTMLElement,
			videoBoxComp: undefined as undefined | Component
		},
		state: {
			videoBoxModel: 1, // 0: close 1: small, 2: middle, 3: full, 
			totalBtn: true,
			video: false
		}
	});

	const _static = {
		data: {
			player: null as null | any,
			subscribeIndex: undefined as undefined |number,
			deviceInfo: null as null | DeviceInfo
		}
	};

	const videoBoxCompClassNameMapper = new Map<string, string>([
		['small', 'monitor-videoBox-small-container'],
		['middle', 'monitor-videoBox-middle-container'],
		['full', 'monitor-videoBox-full-container'],
		['small-ext', 'monitor-videoBox-small-ext-container']
	])

	usePublish('AppHeaderL2State', false);
	usePublish('AppFooterModel', 'inside');
	usePublish('AppFooterState', true);

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
				getVideoAddress({
					deviceSerial: ctx.deviceSerial,
					channelNo: ctx.channelNo
				}).then(url => {
					if(_static.data.player) {
						_static.data.player.src({
							type: "video/flv",
							src: url
						});
					}else {
						usePlayerCreater('my-player').then(player => {
							_static.data.player = player;
							player.src({
								type: "video/flv",
								src: url
							});
						});
					}
				}).catch(err => {
					console.log(err);
				});
			}
		);
	});

	useSubscribe<boolean>('monitorTotalBtnState', (ctx) => {
		_reatcive.state.totalBtn = ctx;
	})

	const boxClassNameSetter = computed(() => {
		if(videoBox.value.type === 'small')
			return 'is-small'
		if(videoBox.value.type === 'middle')
			return 'is-middle'
		return '';
	});

	const totalClickHandler = () => {
		_reatcive.data.zIndex = 900;
		_reatcive.state.videoBoxModel = 3;
	};

	usePublish('setIframerMsg', {
		ctid: 12911,
		state: "open"
	});

	onUnmounted(() => {
		if(_static.data.subscribeIndex) {
			useUnSubscribe('getIFramerMsg_12821', _static.data.subscribeIndex);
		}

		usePublish('setIframerMsg', {
			ctid: 12911,
			state: "close"
		});
	});

	onMounted(() => {
		_reatcive.data.videoBoxComp = videoBox.value.target;
		const className = videoBoxCompClassNameMapper.get(videoBox.value.type);
		if(!className) return;

		Hunter(() => document.querySelector(`.${className} #body`), {
			cycle: 10,
			frequency: 100,
		}).then(el  => {
			console.log('jx', className, el);
			setTimeout(() => {
				_reatcive.state.video = true;
				_reatcive.data.teleportTarget = `body`;
			}, 5000);
			/* _reatcive.data.teleportTarget = el as HTMLElement;
			_reatcive.state.video = true; */
		});
	});

/* 	watch(videoBox, (ctx) => {
		_reatcive.state.video = false;
		_reatcive.data.teleportTarget = 'body';
		setTimeout(() => {
			_reatcive.data.videoBoxComp = ctx.target;
			nextTick(() => {
				const className = videoBoxCompClassNameMapper.get(ctx.type);
				if(!className) return;
				nextTick(() => {
					_reatcive.data.teleportTarget = `.${className} > #body`;
					_reatcive.state.video = true;
				});
			});
		},100)
	}) */
</script>