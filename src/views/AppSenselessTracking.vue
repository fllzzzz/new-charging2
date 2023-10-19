<style lang="scss" scoped>
	.senselessTracking-container {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;left: 0;
		pointer-events: none;
		& > .item {
			position: absolute;
			pointer-events: auto;
			box-sizing: border-box;
		}
	}
</style>

<template>
	<div class="senselessTracking-container">
		<template
			v-for="item in _reactive.data.monitorList"
			:key="item.id"
		>
			<component
				@click.capture="usePublish<DeviceInfo>(
					'deviceInfo',
					item.deviceInfo
				);"
				class="item"
				v-if="item.state === 1"
				:is="item.model"
				:style="videoBoxStyleSetter(item)"
			></component>
		</template>
	</div>
</template>

<script setup lang="ts">
	import MonitorVideoBoxMiddle from '@/components/MonitorVideoBoxMiddle.vue';
	import MonitorVideoBoxSmall from '@/components/MonitorVideoBoxSmall.vue';

	import {
		useSubscribe,
		usePublish
	} from '@/hooks/EventEmitter';

	import {
		DeviceInfo,
		SenselessTrackingVideoBox,
		VideoBoxHeaderBtnState
	} from '@/types';

	import {
		reactive,
		onMounted
	} from 'vue';

	const _reactive = reactive({
		data: {
			monitorList: [
				{
					id: 1,
					state: 1,
					model: MonitorVideoBoxSmall as any,
					points: [176,410],
					deviceInfo: {
						deviceSerial: 'default',
						channelNo: 0
					}
				},
				{
					id: 2,
					state: 1,
					model: MonitorVideoBoxSmall as any,
					points: [176,1018],
					deviceInfo: {
						deviceSerial: 'default',
						channelNo: 1
					}
				},
				{
					id: 3,
					state: 1,
					model: MonitorVideoBoxSmall as any,
					points: [572,410],
					deviceInfo: {
						deviceSerial: 'default',
						channelNo: 2
					}
				},
				{
					id: 4,
					state: 1,
					model: MonitorVideoBoxSmall as any,
					points: [572,1018],
					deviceInfo: {
						deviceSerial: 'default',
						channelNo: 3
					}
				},
			]
		}
	});

	usePublish('AppHeaderL2State', true);
	usePublish('AppSmartGuardState', false);
	usePublish('AppFooterModel', 'inside');
	usePublish('AppFooterState', true);

	const videoBoxStyleSetter = (item :typeof _reactive.data.monitorList[0]) => {
		if(!item.model) return;
		if(item.model.__name === 'MonitorVideoBoxMiddle') {
			return {
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)'
			}
		}else {
			return {
				top: item.points[0] + 'px',
				left: item.points[1] + 'px'
			}
		}
	};

	useSubscribe<SenselessTrackingVideoBox>('senselessTrackingVideoBox', (ctx, ...args) => {
		if(ctx.model === 2) {
			const result = _reactive.data.monitorList.map(item => {
				if(
					item.deviceInfo.deviceSerial === ctx.deviceInfo?.deviceSerial &&
					item.deviceInfo.channelNo === ctx.deviceInfo.channelNo
				) {
					item.model = MonitorVideoBoxMiddle;
				}else {
					item.model = null;
				}
				return item;
			});

			_reactive.data.monitorList = result;

			usePublish<VideoBoxHeaderBtnState>('videoBoxHeaderBtnState',{
				name: 'fullScreen',
				state: 0
			});
		}

		if(ctx.model === 1) {
			const result = _reactive.data.monitorList.map(item => {
				item.model = MonitorVideoBoxSmall;
				return item;
			});

			_reactive.data.monitorList = result;
		}

		if(ctx.model === 0) {
			const index = _reactive.data.monitorList.findIndex(item => {
				if(
					item.model &&
					item.model.__name === 'MonitorVideoBoxMiddle'
				) {
					return true;
				}
			});

			if(index !== -1) {
				_reactive.data.monitorList.forEach((item, key) => {
					item.model = MonitorVideoBoxSmall;
				});
				return;
			}

			const result = _reactive.data.monitorList.map(item => {
				if(
					item.deviceInfo.deviceSerial === ctx.deviceInfo?.deviceSerial &&
					item.deviceInfo.channelNo === ctx.deviceInfo.channelNo
				) {
					if(item.model === MonitorVideoBoxMiddle) {
						item.model = MonitorVideoBoxSmall;
					}else {
						item.model = null;
					}
				}
				return item;
			});

			_reactive.data.monitorList = result;
		}
	});
</script>