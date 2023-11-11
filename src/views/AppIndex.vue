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
		z-index: 1100;
	}
	.header-level2-container {
		position: fixed;
		top: 66px;
		right: 29px;
		z-index: 1100;
	}
	.fixed-height {
		z-index: 1000;
	}
	.fixed-lower {
		z-index: 0;
	}
</style>

<template>
	<AppHeader
		class="fixed-height"
		v-if="compStateInvoke.get('AppHeader')"
	></AppHeader>
	<component
		v-if="compStateInvoke.get('AppFooter')"
		:is="footerChanger"
		class="fixed-height"
	></component>
	<AppSmartGuard
		v-if="compStateInvoke.get('AppSmartGuard')"
	></AppSmartGuard>
	<AppHeaderLevel2
		v-if="compStateInvoke.get('AppHeaderLevel2')"
	></AppHeaderLevel2>
	<RouterView v-slot="{ Component, route }">
		<KeepAlive>
			<component :is="Component" v-if="route.meta.KeepAlive"></component>
		</KeepAlive>
		<component :is="Component" v-if="! route.meta.KeepAlive"></component>
	</RouterView>
<!-- 	<AppIFramer
		class=""
	></AppIFramer> -->
</template>

<script setup lang="ts">
	import AppHeaderLevel2 from '@/components/AppHeaderLevel2.vue';
	import AppIFramer from '@/components/AppIFramer.vue';
	import AppSmartGuard from '@/components/AppSmartGuard.vue';
	import AppFooterInside from '@/components/AppFooterInside.vue';
	import AppFooterOutside from '@/components/AppFooterOutside.vue';
	import AppHeader from '@/components/AppHeader.vue';

	import {
		usePublish
	} from '@/hooks/EventEmitter';

	import {
		compStateInvoke
	} from '@/hooks/compController';

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

	useSubscribe<FooterModelType>('AppFooterModel', (ctx, ...args) => {
		if(!ctx) return;
		_reactive.state.footerModel = ctx;
	});

	const footerChanger = computed(() => {
		if(_reactive.state.footerModel === 'inside')
			return AppFooterInside;
		else if(_reactive.state.footerModel === 'outside')
			return AppFooterOutside;
		else 
			return null;
	});

	usePublish('setIframerMsg', {
		ctid: 14611,
		username: "admin"
	});
</script>