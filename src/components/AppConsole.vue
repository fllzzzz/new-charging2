<style lang="scss" scoped>
		.console-container {
			width: 100%;height: 100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('@/assets/images/background/immCon.png');
			display: flex;
			flex-flow: column nowrap;
			justify-content: flex-start;
			align-items: center;
			& > .item {
				box-sizing: border-box;
			}
			#search {
				width: 267px;
				height: 306px;
				margin-bottom: 36px;
				margin-top: 16px;
			}
			#video {
				width: 290px;
				height: 163px;
				margin-bottom: 23px;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-image: url('@/assets/images/background/video-box.png');
			}
			#controller {
				width: 100%;
				height: 223px;
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-between;
				align-items: center;
				#title {
					align-self: flex-start;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					margin-left: 14px;
					& > .graph.line {
						width: 2px;
						height: 18px;
						background: #11D0D9;
						margin-right: 11px;
					}
					span {
						font-size: 18px;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						text-shadow: 0px 3px 3px rgba(29,114,111,0.63);
					}
				}
			}
		}
</style>

<template>
	<div class="console-container">
		<div class="item" id="search">
			<AppDeviceList></AppDeviceList>
		</div>
		<div class="item" id="video"></div>
		<div class="item" id="controller">
			<div id="title">
				<div class="graph line"></div>
				<span>云台控制</span>
			</div>
			<AppRingController></AppRingController>
		</div>
	</div>
</template>

<script setup lang="ts">
	import AppRingController from '@/components/AppRingController.vue';
	import AppDeviceList from '@/components/AppDeviceList.vue';
</script>