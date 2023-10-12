<style lang="scss" scoped>
	.header-container {
		position: fixed;
		top: 0;
	}
	.footer-outside-container,
	.footer-inside-container {
		position: fixed;
		bottom: 0;
	}
	.smart-guard-container {
		position: fixed;
		top: 113px;
		left: 542px;
	}
	.header-level2-container {
		position: fixed;
		top: 66px;
		right: 29px;
		z-index: 1100;
	}
	.fixed {
		z-index: 1000;
	}
</style>

<template>
	<AppHeader
		class="fixed"
		v-if="_reactive.state.header"
	></AppHeader>
	<component
		v-if="_reactive.state.footer"
		:is="footerChanger"
		class="fixed"
	></component>
	<AppsmartGuard
		v-if="_reactive.state.smartGuard"
		class="fixed"
	></AppsmartGuard>
	<AppHeaderLevel2
		v-if="_reactive.state.headerL2"
	></AppHeaderLevel2>
	<AppIFramer></AppIFramer>
	<RouterView v-slot="{ Component, route }">
		<KeepAlive>
			<component :is="Component" v-if="route.meta.KeepAlive"></component>
		</KeepAlive>
		<component :is="Component" v-if="! route.meta.KeepAlive"></component>
	</RouterView>
</template>

<script setup lang="ts">
	import AppHeaderLevel2 from '@/components/AppHeaderLevel2.vue';
	import AppIFramer from '@/components/AppIFramer.vue';
	import AppsmartGuard from '@/components/AppSmartGuard.vue';
	import AppFooterInside from '@/components/AppFooterInside.vue';
	import AppFooterOutside from '@/components/AppFooterOutside.vue';
	import AppHeader from '@/components/AppHeader.vue';

	import {
		useSubscribe
	} from '@/hooks/EventEmitter';

	import {
		reactive,
		computed
	} from 'vue';

	import {
		useRouter
	} from 'vue-router';

	const router = useRouter();

	type FooterModelType = 'inside' | 'outside';

	const _reactive = reactive({
		state: {
			header: true,
			headerL2: false,
			footer: true,
			smartGuard: true,
			footerModel: undefined as undefined | FooterModelType
		}
	});

	useSubscribe<boolean>('AppHeaderState', (ctx, ...args) => {
		if(ctx === true)
			_reactive.state.header = true;
		else if(ctx === false)
			_reactive.state.header = false;
	});

	useSubscribe<boolean>('AppHeaderL2State', (ctx, ...args) => {
		if(ctx === true)
			_reactive.state.headerL2 = true;
		else if(ctx === false)
			_reactive.state.headerL2 = false;
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
	useSubscribe<FooterModelType>('AppFooterModel', (ctx, ...args) => {
		if(!ctx) return;
		_reactive.state.footerModel = ctx;
	});

	useSubscribe('ctid-12721', (ctx) => {
		router.push({
			name: 'overview'
		});
	});

	const footerChanger = computed(() => {
		if(_reactive.state.footerModel === 'inside')
			return AppFooterInside;
		else if(_reactive.state.footerModel === 'outside')
			return AppFooterOutside;
		else 
			return null;
	});
</script>