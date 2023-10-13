<style lang="scss" scoped>
	.monitor-videoBox-full-container {
		width: 100vw;
		height: 100vh;
		background-color: #010a0fFF;
		position: fixed;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: center;
		& > .item {
			width: 1883px;
			&:first-child {
				margin-top: 100px;
				height: 24px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				align-items: center;
				.box {
					height: 100%;
				}
				@for $i from 1 to 4 {
					@if $i == 1 {
						.box:nth-of-type(#{$i}) {
							width: 102px;
							display: flex;
							flex-flow: row nowrap;
							justify-content: space-between;
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
								font-weight: 500;
								color: #00FFFF;
								line-height: 34px;
							}
						}
					}
					@if $i == 2 {
						.box:nth-of-type(#{$i}) {
							pointer-events: none;
							flex: 1;
							display: flex;
							flex-flow: row nowrap;
							justify-content: flex-end;
							align-items: center;
							img.btn {
								pointer-events: auto;
								width: 24px;
								height: 24px;
								object-fit: contain;
								margin-left: 6px;
								&:first-child {
									margin-left: 0;
								}
							}
						}
					}
					@if $i == 3 {
						.box:nth-of-type(#{$i}) {
							margin-left: 325px;
							margin-bottom: 12px;
							width: 32px;
							height: 32px;
							img {
								width: 100%;
								height: 100%;
								object-fit: contain;
							}
						}
					}
				}
			}
			&:last-child {
				height: 945px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: flex-start;
				.box {
					height: 100%;
					background-repeat: no-repeat;
					background-size: 100% 100%;
					@for $i from 1 to 3 {
						@if $i == 1 {
							&:nth-of-type(#{$i}) {
								height: 947px;
								width: 1526px;
								background-image: url('@/assets/images/background/videoBox-full-body-left.png');
							}
						}
						@if $i == 2 {
							&:nth-of-type(#{$i}) {
								flex: 1;
								background-image: url('@/assets/images/background/videoBox-full-body-right.png');
							}
						}
					}
				}
			}
		}

	}
</style>

<template>
	<div class="monitor-videoBox-full-container">
		<div class="item">
			<div class="box">
				<img src="@/assets/images/icon/monitor-1.png">
				<span>全部监控</span>
			</div>
			<div class="box"
				@click="clickDispensere"
			>
				<template
					v-for="btn in _reactive.data.btnList"
					:key="btn.id"
				>
					<img
						class="btn"
						:id="btn.name"
						:src="btn.imageList[0]"
						:draggable="false"
					>
				</template>
			</div>
			<div class="box">
				<img src="@/assets/images/icon/close.png"
					@click="closeHandler"
				>
			</div>
		</div>
		<div class="item">
			<div class="box"></div>
			<div class="box"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		usePublish
	} from '@/hooks/EventEmitter';

	import {
		reactive
	} from 'vue';

	import {
		MonitorVideoBox
	} from '@/types';

	const emits = defineEmits(['close']);

	const _reactive = reactive({
		data: {
			btnList: [
				{
					id :1,
					name: 'to-small',
					state: 0,
					imageList: [
						require<string>('@/assets/images/icon/to-small.png'),
						require<string>('@/assets/images/icon/to-small_active.png'),
					]
				},
				{
					id :2,
					name: 'to-middle',
					state: 0,
					imageList: [
						require<string>('@/assets/images/icon/to-middle.png'),
						require<string>('@/assets/images/icon/to-middle_active.png'),
					]
				},
				{
					id :3,
					name: 'to-signel',
					state: 0,
					imageList: [
						require<string>('@/assets/images/icon/to-signel.png'),
						require<string>('@/assets/images/icon/to-signel_active.png'),
					]
				},
				{
					id :4,
					name: 'to-mulit',
					state: 0,
					imageList: [
						require<string>('@/assets/images/icon/to-mulit.png'),
						require<string>('@/assets/images/icon/to-mulit_active.png'),
					]
				},
			] 
		}
	});

	usePublish('AppSmartGuardState', false);
	usePublish('AppFooterState', false);
	usePublish('monitorTotalBtnState', false);

	const clickEventInovke = new Map<string[], ((
		...args :any[]
	) => void)>([
		[Array.from(_reactive.data.btnList, btn => btn.name), (...args) => {
			const id = args[0] as string;
			const oldHeightLightElements = 
				_reactive.data.btnList.filter(btn => {
					if (btn.state === 1) {
						btn.state = 0;
						return true;
					}
				});

			if(oldHeightLightElements && oldHeightLightElements.length > 0) {
				oldHeightLightElements.forEach(btn => {
					[btn.imageList[0], btn.imageList[1]] = 
						[btn.imageList[1], btn.imageList[0]];
				})
			}

			_reactive.data.btnList.find(btn => {
				if(btn.name === id) {
					[btn.imageList[0], btn.imageList[1]] = 
						[btn.imageList[1], btn.imageList[0]];
					btn.state = 1;
				}
			});

			switch(id) {
				case 'to-small':
					usePublish<MonitorVideoBox>('monitorVideoBox', {
						model: 1
					});
					usePublish('monitorTotalBtnState', true);
					usePublish('AppFooterState', true);
					break;
				case 'to-middle':
					usePublish<MonitorVideoBox>('monitorVideoBox', {
						model: 2
					});
					usePublish('monitorTotalBtnState', true);
					usePublish('AppFooterState', true);
					break;
				case 'to-mulit':
					/*  */
					break;
				case 'to-signel':
					/*  */
					break;
			}
		}]
	]);

	const clickDispensere = (event :MouseEvent) => {
		const id = (event.target as HTMLElement).id;
		for (let i of clickEventInovke) {
			if(i[0].includes(id)) {
				i[1](id);
				return;
			}
		}		
	};

	const closeHandler = () => {
		usePublish('monitorVideoBox', 0)
		usePublish('AppSmartGuardState', true);
		usePublish('AppFooterState', true);
		usePublish('monitorTotalBtnState', true);
	};
</script>