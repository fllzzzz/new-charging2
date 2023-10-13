<style lang="scss" scoped>
	.monitor-videoBox-middle-container {
		width: 1269px;
		height: 608px;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		& > .item {
			width: 100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}
		#header {
			flex: 1;
		}
		#body {
			height: 576px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: flex-start;
			& > .box {
				height: 100%;
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
			#left {
				width: 991px;
				background-image: url('@/assets/images/background/videoBox-middle-body-left.png');
			}
			#right {
				flex: 1;
				background-image: url('@/assets/images/background/videoBox-middle-body-right.png');
			}
		}
	}
</style>

<template>
	<div class="monitor-videoBox-middle-container">
		<div class="item" id="header">
			<MonitorVideoBoxHeader
				:back-ground="require('@/assets/images/background/videoBox-middle-header.png')"
				:btn-layout="['zoom', 'fullScreen', 'close']"
				:zoom-state="-1"
			></MonitorVideoBoxHeader>
		</div>
		<div class="item" id="body">
			<div class="box" id="left"></div>
			<div class="box" id="right"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import MonitorVideoBoxHeader from './MonitorVideoBoxHeader.vue';
</script>