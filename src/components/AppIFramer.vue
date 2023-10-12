<style lang="scss" scoped>
	.iframer-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		iframe {
			width: 100%;
			height: 100%;
			border: none;
		}
	}
</style>

<template>
	<div class="iframer-container">
		<iframe
			src="http://192.168.1.114:18901"
			ref="elIFrame"
		></iframe>
	</div>
</template>

<script setup lang="ts">
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

	useSubscribe<any>('iframerMessage', (ctx) => {
		elIFrameWindow.value?.postMessage(ctx,'*');
	});

	window.addEventListener('message', (e :MessageEvent) => {
		if(e.origin === 'http://192.168.1.114:18901') {
			const msg = JSON.parse(e.data);
			if(Object.keys(msg).includes('ctid')) {
				usePublish(`ctid-${msg.ctid}`, msg);
			}
		}
	});

	onMounted(() => {
		elIFrameWindow.value = elIFrame.value!.contentWindow as Window;
	});
</script>