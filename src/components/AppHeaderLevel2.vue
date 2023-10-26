<style lang="scss" scoped>
	.header-level2-container {
		height: 38px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		pointer-events: none;
		& > .item {
			height: 100%;
			pointer-events: auto;
			margin-right: 28px;
			&:last-child {
				margin-right: 0;
			}
		}
	}
</style>

<template>
	<div class="header-level2-container">
		<template
			v-for="item in _reactive.data.itemList"
			:key="item.id"
		>
			<img
				class="item"
				:draggable="false"
				:id="item.name"
				:src="item.imageList[0]"
				@click="clickDispensere"
			>
		</template>
	</div>
</template>

<script setup lang="ts">
	import {
		useRouteHighLight
	} from '@/hooks/routerManager';

	import {
		useRouter,
		useRoute
	} from 'vue-router';

	import {
		reactive,
		onMounted
	} from 'vue';

	const router = useRouter();
	const route = useRoute();

	const _reactive = reactive({
		data: {
			itemList: [
				{
					id: 1,
					name: 'fusion-replay',
					showName: '融合回放',
					state: 0,
					imageList: [
						require('@/assets/images/background/fusionReplay_default.png'),
						require('@/assets/images/background/fusionReplay_active.png'),
					]
				},
				{
					id: 2,
					name: 'video-tracking',
					showName: '视频追视',
					state: 0,
					imageList: [
						require('@/assets/images/background/videoTracking_default.png'),
						require('@/assets/images/background/videoTracking_active.png'),
					]
				},
				{
					id: 3,
					name: 'senseless-tracking',
					showName: '无感追视',
					state: 0,
					imageList: [
						require('@/assets/images/background/senselessTracking_default.png'),
						require('@/assets/images/background/senselessTracking_active.png'),
					]
				},
			]
		}
	});

/* 	useRouteHighLight(
		'AppHeaderLevel2',
		_reactive.data.itemList
	); */
	
	const clickDispensere = (event :MouseEvent) => {
		const id = (event.target as HTMLElement).id;
		const target = _reactive.data.itemList.find(
			item => item.name === id
		);

		if(target?.state === 1) {
			router.push({
				name: 'overview'
			});
			return;
		}

		router.push({
			name: target?.name
		})
	};
</script>