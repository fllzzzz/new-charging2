<style lang="scss">

</style>

<template>
	<div></div>
</template>

<script setup lang="ts">
	import MonitorVideoBoxMiddle from '@/components/MonitorVideoBoxMiddle.vue';

	import type {
		Component
	} from 'vue';

	const compMapper = new Map<string, Component>([
		['middle', MonitorVideoBoxMiddle],
	]);
</script>