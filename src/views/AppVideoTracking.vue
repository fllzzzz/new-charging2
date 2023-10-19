<style lang="scss" scoped>
	.video-tracking {
		position: fixed;
		top: 116px;
		right: 29px;
	}
</style>

<template>
	<MonitorVideoBoxSmallExt
		class="video-tracking"
	></MonitorVideoBoxSmallExt>
</template>

<script setup lang="ts">
	import MonitorVideoBoxSmallExt from '@/components/MonitorVideoBoxSmallExt.vue';

	import {
		useSubscribe,
		usePublish
	} from '@/hooks/EventEmitter';

	usePublish('AppHeaderL2State', true);
	usePublish('AppSmartGuardState', false);
	usePublish('AppFooterModel', 'inside');
	usePublish('AppFooterState', true);
</script>