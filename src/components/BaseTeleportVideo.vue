<style lang="scss" scoped>
	.telep-src_container {
		width: 100%;
		height: 100%;
		position: relative;
		box-sizing: border-box;
		video {
			width: 100%;
			height: 100%;
			object-fit: fill;
		}
	}
</style>

<template>
	<Teleport
		:to="_reatcive.data.telepTarget"
		v-show="_reatcive.state.telep"
	>
		<div
			ref="elTelepContainer"
			class="telep-src_container"
		>
			<video id="player"></video>
			<slot></slot>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
	import Player from 'video.js/dist/types/player';

	import {
		getVideoAddress
	} from '@/api/default';

	import {
		usePlayerCreater
	} from '@/hooks/videoManager';

	import {
		DeviceInfo
	} from '@/types';

	import type {
		PropType,
		WatchStopHandle
	} from 'vue';

	import {
		ref,
		watch,
		reactive,
		nextTick,
		onMounted,
		onBeforeUnmount
	} from 'vue';

	const emits = defineEmits(['created']);

	const elTelepContainer = ref<HTMLElement | null>(null);

	const props = defineProps({
		telepTarget: {
			type: String,
			required: false
		},
		className: {
			type: String,
			required: false
		},
		deviceInfo: {
			type: Object as PropType<DeviceInfo>,
			required: false
		}
	});

	const _reatcive = reactive({
		data: {
			telepTarget: 'body' as string | HTMLElement
		},
		state: {
			telep: false
		}
	});

	const _static = {
		data: {
			player: null as null | Player,
			watcherList: [] as WatchStopHandle[]
		}
	};

	const classNameSetter = () => {
		if(! props.className) return;

		if(! elTelepContainer.value) {
			nextTick(() => classNameSetter());
			return;
		}

		elTelepContainer.value.classList.add(props.className);
	};

	const telepTargetElFinder = async (
		targetCSSVar :string
	) => {
		return await new Promise<HTMLElement>(resolve => {
			const _looper = () => {
				const targetEl = 
					document.querySelector<HTMLElement>(targetCSSVar);
				if(! targetEl) {
					nextTick(() => _looper());
					return;
				}
				resolve(targetEl);
			};
			_looper();
		})
	};

	const telepTargetChanger = (
		targetCSSVar :string
	) => {
		if(_reatcive.state.telep) 
			_reatcive.state.telep = false;
		if(_reatcive.data.telepTarget !== 'body')
			_reatcive.data.telepTarget = 'body';

		telepTargetElFinder(targetCSSVar)
		.then(el => {
			_reatcive.data.telepTarget = el;
			_reatcive.state.telep = true;
		})
	};

	const playerSrcChanger = (
		deviceInfo :DeviceInfo
	) => {
		getVideoAddress(deviceInfo).then(url => {
			if(! _static.data.player) return;
			_static.data.player.src({
				type: "video/flv",
				src: url
			});
		})
	};

	const createPlayer = () => {
		usePlayerCreater('player').then(player => {
			emits('created', player);
			(player.el_ as HTMLElement).style
				.height = '100%';
			(player.el_ as HTMLElement).style
				.width = '100%';


			_static.data.player = player;
			if(! props.deviceInfo || Object.keys(props.deviceInfo).length === 0) return;
			playerSrcChanger(props.deviceInfo);
		});

		
	};

	onMounted(() => {
		classNameSetter();
		createPlayer();
	});

	onBeforeUnmount(() => {
		_static.data.player &&
			_static.data.player.dispose();
			_static.data.watcherList.forEach(watcher => {
				watcher();
			})
	});

	_static.data.watcherList.push(
		watch(() => props.telepTarget, (newValue, oldValue) => {
			if(! newValue) return;

			if(newValue === oldValue) return;
			telepTargetChanger(newValue);
		}, {
			immediate: true
		})
	);

	_static.data.watcherList.push(
		watch(() => props.deviceInfo, (newValue, oldValue) => {
			if(! newValue) return;
			if(newValue === oldValue) return;
			playerSrcChanger(newValue);
		})
	);
</script>