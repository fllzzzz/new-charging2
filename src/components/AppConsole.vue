<style lang="scss" scoped>
		.console-container {
			width: 100%;height: 100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('@/assets/images/background/immCon.png');
			position: relative;
			& > .item {
				box-sizing: border-box;
				position: absolute;
			}
			#search {
				width: 267px;
				height: 306px;
				margin-bottom: 36px;
				margin-top: 16px;
				top: 16px;
				left: 14px;
			}
			#video {
				position: relative;
				width: 290px;
				height: 163px;
				top: 358px;
				left: 5px;
				margin-bottom: 23px;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-image: url('@/assets/images/background/video-box.png');
				img {
					width: 22px;
					height: 22px;
					position: absolute;
					top: 4px;right: 4px;
					z-index: 100;
				}
			}
			#controller {
				width: 100%;
				height: 223px;
				top: 544px;
				left: 14px;
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
		:deep(.telep-src_custom) {
			padding: 8px;
		}
</style>

<template>
	<div class="console-container">
		<div class="item" id="search">
			<AppDeviceList></AppDeviceList>
		</div>
		<div class="item" id="video"
			v-if="_reatcive.state.video"
		>
			<img 
				@click="() => telepTargetChanger()"
				src="@/assets/images/icon/size-up.png">
		</div>
		<div class="item" id="controller">
			<div id="title">
				<div class="graph line"></div>
				<span>云台控制</span>
			</div>
			<AppRingController></AppRingController>
		</div>
		<BaseTeleportVideo
			:telep-target="_reatcive.data.telepTarget"
			class-name="telep-src_custom"
		>
		</BaseTeleportVideo>
	</div>
	<slot :fn="videoBoxChanger"></slot>
</template>

<script setup lang="ts">
	import BaseTeleportVideo from './BaseTeleportVideo.vue';
	import AppRingController from '@/components/AppRingController.vue';
	import AppDeviceList from '@/components/AppDeviceList.vue';

	import {
		reactive
	} from 'vue';

	const emits = defineEmits(['videoModelChange']);

	const _reatcive = reactive({
		data: {
			telepTarget: 
				'.console-container > .item#video',
		},
		state: {
			video: true
		}
	});

	const telepTargetChanger = () => {
		_reatcive.data.telepTarget = '#big-video-box';
		_reatcive.state.video = false;
		emits('videoModelChange', 'big');
	};

	const videoBoxChanger = () => {
		_reatcive.state.video = true;
		_reatcive.data.telepTarget = '.console-container > .item#video';
	};
</script>