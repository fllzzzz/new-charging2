<style lang="scss" scoped>
	.map-container {
		pointer-events: none;
		position: fixed;
		width: 100vw;
		height: 100vh;
		& > .item {
			position: absolute;
			pointer-events: auto;
			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
			@for $i from 1 to 6 {
				&:nth-of-type(#{$i}) {
					width: calc(var(--width)*1px);
					height: calc(var(--height)*1px);
					top: calc(var(--top)*1px);
					left: calc(var(--left)*1px);
				}
			}
		}
	}

	.model-iframe {
		border: none;
		overflow: hidden;
	}
</style>

<template>
	<div class="map-container"
		style="z-index: 1100;"
	>
		<template v-for="item in _reactive.data.cardList" :key="item.id">
			<div class="item"
				:style="{
					'--width': item.width,
					'--height': item.height,
					'--top': item.points[0],
					'--left': item.points[1],
				}"
			>
				<!-- <img :src="item.image"> -->
				<iframe
					scrolling="no"
					class="model-iframe"
					:src="item.src"
					style="width: 100%;height: 100%;box-sizing: border-box;"
				></iframe>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
	import {
		stationID
	} from '@/store';

	import {
		ctid_12721
	} from '@/types';

	import {
		usePublish,
		useSubscribe
	} from '@/hooks/EventEmitter';

	import {
		reactive
	} from 'vue';

	import {
		useRouter
	} from 'vue-router';

	const router = useRouter();

	const _reactive = reactive({
		data: {
			cardList: [
				{
					id: 1,
					width: 311,
					height: 145,
					points: [100,20],
					image: require('@/assets/images/background/system-mangle.png'),
					src: 'http://localhost:8080/#/ring1'
				},
				{
					id: 2,
					width: 320,
					height: 785,
					points: [265,20],
					image: require('@/assets/images/background/system-data.png'),
					src: 'http://localhost:8080/#/key-operational-data'
				},
				{
					id: 3,
					width: 311,
					height:  229,
					points: [100,1589],
					image: require('@/assets/images/background/operation-data.png'),
					src: 'http://localhost:8080/#/operational-data'
				},
				{
					id: 4,
					width: 311,
					height:315,
					points: [349,1589],
					image: require('@/assets/images/background/charg-data.png'),
					src: 'http://localhost:8080/#/charg-data'
				},
				{
					id: 5,
					width: 311,
					height: 366,
					points: [684,1589],
					image: require('@/assets/images/background/income-overview.png'),
					src: 'http://localhost:8080/#/income-overview'
				},
			]
		}
	});

	usePublish<boolean>('AppFooterState', true);
	usePublish<boolean>('AppSmartGuardState', true);
	usePublish<string>('AppFooterModel', 'outside');

	useSubscribe<ctid_12721>('getIFramerMsg_12721', (ctx) => {
		if(parseInt(ctx.chargestationid) !== -1) {
			stationID.value = parseInt(ctx.chargestationid);
			router.push({
				name: 'overview'
			});
		}
	});
</script>