<style lang="scss" scoped>
	.overview-container {
		width: 100vw;
		height: 100vh;
		position: fixed;
		pointer-events: none;
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
	<div class="overview-container">
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
		usePublish
	} from '@/hooks/EventEmitter';

	import {
		reactive
	} from 'vue';

	const _reactive = reactive({
		data: {
			cardList: [
				{
					id: 1,
					width: 343,
					height: 247,
					points: [120,18],
					image: require('@/assets/images/background/system-data-1.png'),
					src: 'http://localhost:8080/#/operational-data'
				},
				{
					id: 2,
					width: 343,
					height: 343,
					points: [382,18],
					image: require('@/assets/images/background/charging-data.png'),
					src: 'http://localhost:8080/#/charg-data'
				},
				{
					id: 3,
					width: 343,
					height: 265,
					points: [731,18],
					image: require('@/assets/images/background/outside-env.png'),
					src: 'http://localhost:8080/#/outdoor-env'
				},
				{
					id: 4,
					width: 343,
					height: 468,
					points: [120,1560],
					image: require('@/assets/images/background/system-mangle-1.png'),
					src: 'http://localhost:8080/#/sys-overview'
				},
				{
					id: 1,
					width: 343,
					height: 388,
					points: [608,1560],
					image: require('@/assets/images/background/income-overview-1.png'),
					src: 'http://localhost:8080/#/income-overview'
				},
			]
		}
	});

	usePublish<string>('AppFooterModel', 'inside');
	usePublish<boolean>('AppFooterState', true);
	usePublish<boolean>('AppHeaderL2State', true);
	usePublish<boolean>('AppSmartGuardState', true);
</script>