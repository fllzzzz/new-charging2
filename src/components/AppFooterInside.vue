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
		useRouteHighLight
	} from '@/hooks/routerManager';

	import {
		reactive,
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

	useRouteHighLight()(
		'AppFooterInside',
		_reactive.data.btnList,
	);

	const clickDispensere = (event :MouseEvent) => {
		const id = (event.target as HTMLElement).id;
		const target = _reactive.data.btnList.find(
			item => item.name === id
		);

		if(
			target?.name === 'video-inspect' ||
			target?.name === 'digital-inspect'
		) {
			const _target = target.name.split('-')[0];
			router.push({
				path: `inspect/${_target}`
			});
			return;
		}

		router.push({
			name: target?.name
		})
	};
</script>