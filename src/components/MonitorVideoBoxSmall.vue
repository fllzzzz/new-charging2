<style lang="scss" scoped>
	.monitor-videoBox-small-container {
		width: 494px;
		height: 311px;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		& > .item {
			width: 100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			box-sizing: border-box;
		}
		#header {
			flex: 1;
		}
		#body {
			height: 283px;
			padding: 5px;
			background-image: url('@/assets/images/background/videoBox-small-body.png');
		}
	}
</style>

<template>
	<div class="monitor-videoBox-small-container">
		<div class="item" id="header">
			<MonitorVideoBoxHeader
				:back-ground="require('@/assets/images/background/videoBox-small-header.png')"
				:btn-layout="['zoom', 'close']"
				:zoom-state="1"
			></MonitorVideoBoxHeader>
		</div>
		<div class="item" id="body"></div>
	</div>
</template>

<script setup lang="ts">
	import MonitorVideoBoxHeader from './MonitorVideoBoxHeader.vue';

	import {
		reactive
	} from 'vue';
</script>