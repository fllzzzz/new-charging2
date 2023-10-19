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
				padding-top: 16px;
				flex: 1;
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: flex-start;
				box-sizing: border-box;
				padding-left: 14px;
				background-image: url('@/assets/images/background/videoBox-middle-body-right.png');
			}
		}
	}
	.cloudController-container {
		width: 238px;
		height: 332px;
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
			<div class="box" id="right">
				<AppCloudController></AppCloudController>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import AppCloudController from '@/components/AppCloudController.vue';
	import MonitorVideoBoxHeader from './MonitorVideoBoxHeader.vue';
</script>