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
		PropType
	} from 'vue';

	import {
		ref,
		watch,
		reactive,
		nextTick,
		onMounted,
		onBeforeUnmount
	} from 'vue';

	const elTelepContainer = ref<HTMLElement | null>(null);

	const props = defineProps({
		telepTarget: {
			type: String,
			required: true
		},
		className: {
			type: String,
			required: false
		},
		deviceInfo: {
			type: Object as PropType<DeviceInfo>,
			required: false,
			default: null
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
			player: null as null | Player
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
				type: "video/flv",url
			});
		})
	};

	const createPlayer = () => {
		usePlayerCreater('player').then(player => {
			(player.el_ as HTMLElement).style
				.height = '100%';
			(player.el_ as HTMLElement).style
				.width = '100%';


			_static.data.player = player;
			if(! props.deviceInfo) return;
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
	});

	watch(() => props.telepTarget, (newValue, oldValue) => {
		if(newValue === oldValue) return;
		telepTargetChanger(newValue);
	}, {
		immediate: true
	})

	watch(() => props.deviceInfo, (newValue, oldValue) => {
		if(newValue === oldValue) return;
		playerSrcChanger(newValue);
	});
</script>