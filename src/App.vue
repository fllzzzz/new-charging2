<style lang="scss">
	#app {
		user-select: none;
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
</script>