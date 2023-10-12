<style lang="scss">
	#app {
		user-select: none;
		display: flex;
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
	import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>