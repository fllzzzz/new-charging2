<style lang="scss" scoped>
	.inspect-container {
		width: 100vw;
		height: 91px;
		position: fixed;
		bottom: 0;
	}
</style>

<template>
	<div class="inspect-container">
		<InspectEditorVideo
			model="maker"
		></InspectEditorVideo>
	</div>
</template>

<script setup lang="ts">
	import {
		ctid13511_isSet
	} from '@/store';

	import Hunter from '@/utils/Hunter';

	import InspectEditorVideo from '@/components/InspectEditorVideo.vue';

	import {
		usePublish,
		useSubscribe
	} from '@/hooks/EventEmitter';

	usePublish('AppFooterState', false);

	Hunter(() => ctid13511_isSet, {
		cycle: 25,
		frequency: 20,
		timing(target) {
			if(target.value === true) return true;
			return false;
		}
	}).then(() => {
		usePublish('setIframerMsg', {
			ctid: 12611,
			taskid: "1"
		});
		ctid13511_isSet.value = false;
	}).catch(e => console.log(e))
</script>