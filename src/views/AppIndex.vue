<style lang="scss" scoped>
	.header-container {
		top: 0;
	}
	.footer-container {
		bottom: 0;
	}
	.smart-guard-container {
		top: 113px;
		left: 542px;
	}
</style>

<template>
	<AppHeader
		v-if="_reactive.state.header"
	></AppHeader>
	<AppFooter
		v-if="_reactive.state.footer"
	></AppFooter>
	<AppsmartGuard
		v-if="_reactive.state.smartGuad"
	></AppsmartGuard>
	<RouterView v-slot="{ Component, route }">
		<KeepAlive>
			<component :is="Component" v-if="route.meta.KeepAlive"></component>
		</KeepAlive>
		<component :is="Component" v-if="! route.meta.KeepAlive"></component>
	</RouterView>
</template>

<script setup lang="ts">
	import AppsmartGuard from '@/components/AppSmartGuard.vue';
	import AppFooter from '@/components/AppFooter.vue';
	import AppHeader from '@/components/AppHeader.vue';

	import {
		reactive
	} from 'vue';

	const _reactive = reactive({
		state: {
			header: true,
			footer: true,
			smartGuad: true,
		}
	});
</script>