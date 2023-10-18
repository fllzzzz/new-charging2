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
				:style="{
					top: item.points[0] + 'px',
					left: item.points[1] + 'px'
				}"
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
	} from '@/types';

	import type {
		Component
	} from 'vue';

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
					model: MonitorVideoBoxSmall as Component | null,
					points: [176,410],
					deviceInfo: {
						deviceSerial: 'default',
						channelNo: 0
					}
				},
				{
					id: 2,
					state: 1,
					model: MonitorVideoBoxSmall as Component | null,
					points: [176,1018],
					deviceInfo: {
						deviceSerial: 'default',
						channelNo: 1
					}
				},
				{
					id: 3,
					state: 1,
					model: MonitorVideoBoxSmall as Component | null,
					points: [572,410],
					deviceInfo: {
						deviceSerial: 'default',
						channelNo: 2
					}
				},
				{
					id: 4,
					state: 1,
					model: MonitorVideoBoxSmall as Component | null,
					points: [572,1018],
					deviceInfo: {
						deviceSerial: 'default',
						channelNo: 3
					}
				},
			]
		}
	});

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
				return item.model == MonitorVideoBoxMiddle;
			});

			console.log('jx',index);

			if(index !== -1) {
				_reactive.data.monitorList.forEach((item, key) => {
					item.model = MonitorVideoBoxSmall;
				});
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