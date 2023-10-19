<style lang="scss" scoped>
	.monitor-videoBox-header-container {
		width: 100%;
		height: 100%;
		display: flex;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		background-repeat: no-repeat;
		background-size: fill;
		pointer-events: none;
		& > .item {
			height: 100%;
			&:first-child{
				margin-left: 9px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: center;
				img {
					width: 24px;
					height: 24px;
					object-fit: contain;
					margin-right: 7px;
				}
				span {
					font-size: 16px;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
			&:last-child {
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-end;
				align-items: center;
				img.btn {
					width: 24px;
					height: 24px;
					object-fit: fill;
					margin-right: 8px;
					pointer-events: auto;
					&:last-child {
						margin-right: 0
					}
				}
			}
		}
	}
</style>

<template>
	<div class="monitor-videoBox-header-container"
		ref="elContainer"
	>
		<div class="item">
			<img src="@/assets/images/icon/monitor.png">
			<span>{{ props.title }}</span>
		</div>
		<div class="item"
			@click="clickHandler"
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
					v-if="btn.state === 1"
				>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		usePublish,
		useSubscribe
	} from '@/hooks/EventEmitter';

	import hunter from '@/utils/Hunter';

	import {
		MonitorVideoBox,
		DeviceInfo,
		SenselessTrackingVideoBox,
		VideoBoxHeaderBtnState
	} from '@/types';

	import {
		ref,
		reactive,
		onMounted,
		onBeforeUnmount,
	} from 'vue';

	const elContainer = ref<HTMLElement | null>(null);

	const props = defineProps({
		title: {
			type: String,
			required: false,
			default: 'default'
		},
		backGround: {
			type: String,
			required: false,
			default: undefined
		},
		btnLayout: {
			type: Array,
			required: false,
			default: null
		},
		zoomState: {
			type: Number,
			required: false,
			default: 1
		}
	});

	const _reactive = reactive({
		data: {
			btnList: [
				{
					id: 1,
					name: 'zoom',
					state: 0,
					lock: 0,
					code: undefined as undefined | number,
					imageList: [
						require<string>('@/assets/images/icon/size-up.png'),
						require<string>('@/assets/images/icon/size-down.png'),
						
					]
				},
				{
					id: 2,
					name: 'fullScreen',
					state: 0,
					lock: 0,
					code: 3,
					imageList: [require<string>('@/assets/images/icon/full.png')]
				},
				{
					id: 3,
					name: 'close',
					state: 0,
					lock: 0,
					code: 0,
					imageList: [require<string>('@/assets/images/icon/close.png')]
				},
			]
		}
	});

	const _static = {
		data: {
			deviceInfo: null as null | DeviceInfo,
		}
	};

	useSubscribe<DeviceInfo>('deviceInfo', (ctx) => {
		_static.data.deviceInfo = ctx;
	});

	useSubscribe<VideoBoxHeaderBtnState>('videoBoxHeaderBtnState', (ctx) => {
		for(let i=0; i < _reactive.data.btnList.length; i++) {
			if(_reactive.data.btnList[i].name === ctx.name) {
				_reactive.data.btnList[i].lock = 1;
				_reactive.data.btnList[i].state = ctx.state;
				return;
			}
		}
	});

	const clickHandler = (event :MouseEvent) => {
		const id = (event.target as HTMLElement).id;
		const target = _reactive.data.btnList.find(btn => btn.name === id);
		if (!target) return;
		if (target.code === undefined) return;
		usePublish<MonitorVideoBox>('monitorVideoBox',{
			model: target.code,
		});

		hunter(() => _static.data.deviceInfo, {
			cycle: 10,
			frequency: 10
		}).then(result => {
			if (target.code === undefined) return;
			usePublish<SenselessTrackingVideoBox>(
				'senselessTrackingVideoBox',{
					model: target.code,
					deviceInfo: result
				}
			);
		}).catch(err => {
			console.log(err);
		})
	};

	onMounted(() => {
		if(!elContainer.value || !props.backGround) return;
		elContainer.value.style.backgroundImage = `url('${props.backGround}')`;
	
		if(props.btnLayout) {
			props.btnLayout.forEach(name => {
				_reactive.data.btnList.forEach(btn => {
					if(btn.name === name) {
						if(btn.lock === 1) return;
						btn.state = 1;
						if(btn.name === 'zoom') {
							if(props.zoomState < 0) {
								[btn.imageList[0], btn.imageList[1]] =
								[btn.imageList[1], btn.imageList[2]]
								btn.code = 1;
							}else {
								btn.code = 2;
							}
						}
					}
				});
			});
		}
	});

	onBeforeUnmount(() => {
		_reactive.data.btnList.forEach(btn => {
			btn.lock = 0;
		});
	});
</script>