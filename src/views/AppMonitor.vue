<style lang="scss" scoped>
	.box#total {
		z-index: 1100;
		width: 108px;
		height: 36px;
		position: fixed;
		top: 83px;
		right: 27px;
		background-repeat: no-repeat;
		background-repeat: 100% 100%;
		background-image: url('@/assets/images/background/btn-1.png');
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		img {
			pointer-events: none;
			width: 24px;
			height: 24px;
			object-fit: contain;
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
	.is-small {
		position: fixed;
		top: 129px;
		right: 27px;
		z-index: 1100;
	}
	.is-middle {
		position: fixed;
		top: 220px;
		right: 300px;
		z-index: 1100;
	}
</style>

<template>
	<div class="box" id="total"
		v-if="_reatcive.state.totalBtn"
		@click="totalClickHandler"
	>
		<img src="@/assets/images/icon/monitor.png">
		<span>全部监控</span>
	</div>
	<component
		:is="setVideoBoxModel"
		:class="boxClassNameSetter"
	></component>
</template>

<script setup lang="ts">
	import MonitorVideoBoxFull from '@/components/MonitorVideoBoxFull.vue';
	import MonitorVideoBoxMiddle from '@/components/MonitorVideoBoxMiddle.vue';
	import MonitorVideoBoxSmall from '@/components/MonitorVideoBoxSmall.vue';

	import {
		usePublish,
		useSubscribe
	} from '@/hooks/EventEmitter';

	import type {
		MonitorVideoBox
	} from '@/types';

	import {
		reactive,
		computed
	} from 'vue';

	const _reatcive = reactive({
		state: {
			videoBoxModel: 1, // 0: close 1: small, 2: middle, 3: full, 
			totalBtn: true,
		}
	});

	usePublish('AppHeaderL2State', false);
	usePublish('AppFooterState', true);

	const setVideoBoxModel = computed(() => {
		if(_reatcive.state.videoBoxModel === 0)
			return null;
		if(_reatcive.state.videoBoxModel === 1)
			return MonitorVideoBoxSmall;
		if(_reatcive.state.videoBoxModel === 2)
			return MonitorVideoBoxMiddle;
		if(_reatcive.state.videoBoxModel === 3)
			return MonitorVideoBoxFull;
		return null;
	});

	useSubscribe<MonitorVideoBox>('monitorVideoBox', (data) => {
		if(data.model === 1 || data.model === 0) {
			usePublish('AppSmartGuardState', true);
		}
		if(data.model === 2) {
			usePublish('AppSmartGuardState', false);
		}
		if(data.model === 3) {
			//
		}
		_reatcive.state.videoBoxModel = data.model;
	})

	useSubscribe<boolean>('monitorTotalBtnState', (ctx) => {
		_reatcive.state.totalBtn = ctx;
	})

	const boxClassNameSetter = computed(() => {
		if(_reatcive.state.videoBoxModel === 1)
			return 'is-small'
		if(_reatcive.state.videoBoxModel === 2)
			return 'is-middle'
		return '';
	});

	const totalClickHandler = () => {
		_reatcive.state.videoBoxModel = 3;
	};
</script>