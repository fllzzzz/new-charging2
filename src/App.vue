<style lang="scss">
	#app {
		user-select: none;
	}

	.vjs-tech {
		width: 100%;
		height: 100%;
		object-fit: fill;
	}
</style>

<template>
	<RouterView v-slot="{Component, route}">
		<KeepAlive>
			<el-config-provider
				:locale="zhCn"
			>
				<component :is="Component" v-if="route.meta.keepAlive"></component>
			</el-config-provider>
		</KeepAlive>
		<el-config-provider
			:locale="zhCn"
		>
			<component :is="Component" v-if="! route.meta.keepAlive"></component>
		</el-config-provider>
	</RouterView>
</template>

<script setup lang="ts">
	import {
		getToken,
		tokenStorage,
	} from '@/api/default';

	import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

	import pachResizeObserver from '@/utils/patchResizeObserver';

	pachResizeObserver();
	getToken().then(token => tokenStorage.value = token);

	import {
		useGetCurrentWeekRanges,
		useGetCurrentMonthRanges,
		useGetCurrentDayRanges,
	} from '@/hooks/inspectTimeFilter';
</script>