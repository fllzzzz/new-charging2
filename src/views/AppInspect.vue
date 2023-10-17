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
		<InspectEditorVideo></InspectEditorVideo>
	</div>
</template>

<script setup lang="ts">
	import InspectEditorVideo from '@/components/InspectEditorVideo.vue';
</script>