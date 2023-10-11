<style lang="scss" scoped>
	.header-container {
		position: fixed;
		top: 0;
	}
	.footer-container {
		position: fixed;
		bottom: 0;
	}
	.smart-guard-container {
		position: fixed;
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
		v-if="_reactive.state.smartGuard"
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
		useSubscribe
	} from '@/hooks/EventEmitter';

	import {
		reactive
	} from 'vue';

	const _reactive = reactive({
		state: {
			header: true,
			footer: true,
			smartGuard: true,
		}
	});

	useSubscribe<boolean>('AppHeaderState', (ctx, ...args) => {
		if(ctx === true)
			_reactive.state.header = true;
		else if(ctx === false)
			_reactive.state.header = false;
	});

	useSubscribe<boolean>('AppFooterState', (ctx, ...args) => {
		if(ctx === true)
			_reactive.state.footer = true;
		else if(ctx === false)
			_reactive.state.footer = false;
	});
	useSubscribe<boolean>('AppSmartGuardState', (ctx, ...args) => {
		if(ctx === true)
			_reactive.state.smartGuard = true;
		else if(ctx === false)
			_reactive.state.smartGuard = false;
	});
</script>