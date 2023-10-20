<style lang="scss" scoped>
	.footer-inside-container {
		width: 100%;
		height: 150px;
		background-repeat: no-repeat;
		background-size: contain;
		background-image: url('@/assets/images/background/overview-footer.png');
		pointer-events: none;
		& > .item {
			pointer-events: auto;
		}
		#btn-group {
			width: 1066px;
			height: 37px;
			pointer-events: none;
			position: absolute;
			left: 418px;
			bottom: 13px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			& > .btn {
				pointer-events: auto;
				height: 100%;
				img {
					height: 100%;
					object-fit: fill;
				}
			}
		}
	}
</style>

<template>
	<div class="footer-inside-container">
		<div class="item" id="btn-group"
			@click="clickDispensere"
		>
			<template 
				v-for="btn in _reactive.data.btnList"
				:key="btn.id"
			>
				<img 
					class="btn"
					:id="btn.name"
					:draggable="false"
					:src="btn.imageList[0]"
				>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		watch,
		reactive
	} from 'vue';

	import {
		useRoute,
		useRouter
	} from 'vue-router';

	const route = useRoute();
	const router = useRouter();

	const _reactive = reactive({
		data: {
			btnList: [
				{
					id: 1,
					name: 'overview',
					state: 0,
					imageList: [
						require('@/assets/images/background/overview_default.png'),
						require('@/assets/images/background/overview_active.png')
					]
				},
				{
					id: 2,
					name: 'monitor',
					state: 0,
					imageList: [
						require('@/assets/images/background/monitor_default.png'),
						require('@/assets/images/background/monitor_active.png')
					]
				},
				{
					id: 3,
					name: 'video-inspect',
					state: 0,
					imageList: [
						require('@/assets/images/background/video-inspect_default.png'),
						require('@/assets/images/background/video-inspect_active.png')
					]
				},
				{
					id: 4,
					name: 'digital-inspect',
					state: 0,
					imageList: [
						require('@/assets/images/background/digital-inspect_default.png'),
						require('@/assets/images/background/digital-inspect_active.png')
					]
				},
				{
					id: 5,
					name: 'immediate-controller',
					state: 0,
					imageList: [
						require('@/assets/images/background/immediate-controller_default.png'),
						require('@/assets/images/background/immediate-controller_active.png')
					]
				},
				{
					id: 6,
					name: 'scene-controller',
					state: 0,
					imageList: [
						require('@/assets/images/background/scene_default.png'),
						require('@/assets/images/background/scene_active.png')
					]
				},
			],
		}
	});

	const clickDispensere = (event :MouseEvent) => {
		const oldHightLightElement = _reactive.data.btnList.filter(btn => {
			return btn.state === 1;
		});
		if(oldHightLightElement.length > 0) {
			oldHightLightElement.forEach(btn => {
				[btn.imageList[0], btn.imageList[1]] =
					[btn.imageList[1], btn.imageList[0]];
					btn.state = 0;
			});
		}

		const id = (event.target as HTMLElement).id;
		const target = _reactive.data.btnList.find(btn => {
			return btn.name === id;
		});
		if(!target) return;
		[target.imageList[0], target.imageList[1]] =
			[target.imageList[1], target.imageList[0]];
		target.state = 1;

		switch(id) {
			case 'monitor':
				router.push({
					name: 'monitor'
				});
				break;
			case 'video-inspect':
				router.push({
					path: 'inspect/video'
				});
				break;
			case 'digital-inspect':
				router.push({
					path: 'inspect/digital'
				});
				break;
			case 'immediate-controller':
				router.push({
					name: 'immediate-controller'
				});
				break;
			case 'scene-controller':
				router.push({
					name: 'scene-controller'
				});
				break;
			case 'overview':
				router.push({
					name: 'overview'
				});
				break;
		}
	};

/* 	watch(() => route.name, (name) => {
		const target = _reactive.data.btnList.find(btn => {
			if(btn.name === name) {
				btn.state = 1;
				return true;
			}
		});
		if(!target) return;
		[target.imageList[0], target.imageList[1]] =
		[target.imageList[1], target.imageList[0]]
	}, {
		immediate: true
	}) */
</script>