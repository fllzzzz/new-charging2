<style lang="scss" scoped>
	iframe {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;left: 0;
		z-index: -1000;

	}
</style>

<template>
	<iframe
		src="http://192.168.1.114:18901"
		ref="elIFrame"
	></iframe>
</template>

<script setup lang="ts">
	import {
		ctid13511_isSet
	} from '@/store';

	import {
		usePublish,
		useSubscribe
	} from '@/hooks/EventEmitter';

	import {
		ref,
		onMounted
	} from 'vue';

	const elIFrame = ref<HTMLIFrameElement | null>(null);
	const elIFrameWindow = ref<Window | null>(null);

	useSubscribe<any>('setIframerMsg', (ctx) => {
		try {
			if(ctx.ctid === 13511) {
				ctid13511_isSet.value = true;
			}
		} catch (error) {
			console.log(error);
		}
		elIFrameWindow.value?.postMessage(ctx, '*');
	});

	window.addEventListener('message', (e :MessageEvent) => {
		if(e.origin === 'http://192.168.1.114:18901') {
			const msg = JSON.parse(e.data);
			if(Object.keys(msg).includes('ctid')) {
				usePublish(`getIFramerMsg_${msg.ctid}`, msg);
			}
		}
	});

	onMounted(() => {
		elIFrameWindow.value = elIFrame.value!.contentWindow as Window;
	});
</script>