<style lang="scss" scoped>
	.inspect-alarm-check-container {
		width: 542px;
		height: 985px;
		background: rgba(2,21,25,0.8);
		border: 1px solid #005B5B;
		box-sizing: border-box;
		pointer-events: none;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-around;
		align-items: center;
		& > .item {
			box-sizing: border-box;
			pointer-events: auto;
		}
		#content {
			width: 501px;
			height: 482px;
			& > .box {
				box-sizing: border-box;
			}
			& > #header {
				width: 100%;
				height: 32px;
				margin-bottom: 26px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				align-items: center;
				span {
					font-size: 18px;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #FFFFFF;
				}
				img {
					width: 32px;
					height: 32px;
					object-fit: fill;
				}
			}
			.row {
				justify-content: flex-start;
				margin-bottom: 20px;
				&#time {
					margin-bottom: 9px;
				}
				img {
					width: 20px;
					height: 20px;
					object-fit: fill;
					margin-right: 17px;
				}
				span {
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 24px;
				}
			}
			#image {
				width: 480px;
				height: 269px;
				img {
					width: 100%;height: 100%;
					object-fit: fill;
				}
			}
		}
		#video-btn-group,
		#option-btn-group {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			img {
				width: 18px;
				height: 18px;
				object-fit: fill;
				margin-right: 5px;
			}
			span {
				font-size: 14px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 24px;
			}
			.btn {
				display: flex;
				flex-flow: row nowrap;
				justify-content: center;
				align-items: center;
				& > * {
					pointer-events: none;
				}
			}
		}
		#video-btn-group {
			width: 208px;
			height: 32px;
			margin-left: 30px;
			align-self: flex-start;
			pointer-events: none;
			& > .btn {
				width: 96px;
				height: 32px;
				background: rgba(3,109,106,0.4);
				border: 1px solid #036D6A;
				opacity: 0.9;
				border-radius: 2px;
				pointer-events: auto;
				& > * {
					pointer-events: none;
				}
				&.is-active {
					background: linear-gradient(0deg, rgba(18,212,214,0.88) 0%, rgba(20,205,198,0.3) 100%);
					opacity: 0.8;
				}
			}
		}
		#video {
			width: 492px;
			height: 304px;
		}
		#option-btn-group {
			width: 220px;
			height: 36px;
			margin-right: 36px;
			align-self: flex-end;
			& > .btn {
				width: 90px;
				height: 36px;
				background: linear-gradient(0deg, #14CDC6 0%, rgba(31,94,92,0.24) 100%);	
			}
		}
	}

	.row {
		width: 100%;
		height: 15px;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		.col {
			height: 100%;
			display: flex;
			align-items: center;
		}
	}
</style>

<template>
	<div class="inspect-alarm-check-container">
		<div class="item" id="content">
			<div class="box" id="header">
				<span>告警查看</span>
				<img src="@/assets/images/icon/close-1.png"
					@click="closeHandler"
				>
			</div>
			<template
				v-for="val, key, index in _reactive.data"
				:key="index"
			>
					<template v-if="key === 'time'">
						<div class="row">
							<div class="col">
								<img src="@/assets/images/icon/time-1.png">
							</div>
							<div class="col">
								<span>{{ val }}</span>
							</div>
						</div>
					</template>
					<template v-if="key === 'name'">
						<div class="row">
							<div class="col">
								<img src="@/assets/images/icon/monitor.png">
							</div>
							<div class="col">
								<span>{{ val }}</span>
							</div>
						</div>
					</template>
					<template v-if="key === 'alarmList'">
						<div class="row">
							<div class="col">
								<img src="@/assets/images/icon/alarm-1.png">
							</div>
							<div class="col">
								<template
									v-for="ctx, index in val"
									:key="index"	
								>
									<template
										v-if="index === (val as string[]).length -1"
									>
										<span>{{ ctx }}。</span>
									</template>
									<template v-else>
										<span>{{ ctx }}，</span>
									</template>
								</template>
							</div>
						</div>
					</template>
					<template v-if="key === 'image'">
						<div class="row">
							<div class="col">
								<img src="@/assets/images/icon/img-1.png">
								<span>告警照片</span>
							</div>
						</div>
						<div class="row" id="time">
							<span>{{ new Date().toLocaleString() }}</span>
						</div>
						<div id="image">
							<img src="@/assets/images/background/test-1.png">
						</div>
					</template>
			</template>

		</div>
		<div class="item" id="video-btn-group"
			@click="videoBtnClickHandler"
		>
			<div class="btn" id="video">
				<img src="@/assets/images/icon/video-capter-1.png">
				<span>告警录屏</span>
			</div>
			<div class="btn" id="monitor">
				<img src="@/assets/images/icon/monitor.png">
				<span>实时监控</span>
			</div>
		</div>
		<div class="item" id="video">
			<MonitorVideoBoxSmall
				v-if="_reactive.state.videoBox"
			></MonitorVideoBoxSmall>
		</div>
		<div class="item" id="option-btn-group">
			<div class="btn">
				<span>自动处理</span>
			</div>
			<div class="btn"
				@click="clickImmConHandler">
				<span>现场管控</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import MonitorVideoBoxSmall from './MonitorVideoBoxSmall.vue';

	import {
		usePublish
	} from '@/hooks/EventEmitter';

	import type {
		DeviceInfo
	} from '@/types';

	import {
		useRouter
	} from 'vue-router';

	import {
		reactive
	} from 'vue';

	const router = useRouter();

	const emits = defineEmits(['close']);

	const _reactive = reactive({
		state: {
			videoBox: false
		},
		data: {
			deviceInfo: {} as DeviceInfo,
			time: new Date().toLocaleString(),
			name: '1号充电桩东北角',
			alarmList: ['充电桩未归位', '充电桩外观损坏', '充电桩外观损坏'],
			image: require<string>('@/assets/images/background/test-1.png'),
		}
	});

	usePublish('AppFooterModel', 'inside');

	const closeHandler = () => {
		emits('close');
	};

	const clickImmConHandler = () => {
		usePublish('setIframerMsg', {
			ctid: 14711,
			chargestationid: '1'
		});

		router.push({
			name: 'scene-controller'
		})
	};

	const videoBtnClickHandler = (() => {
		let _el :HTMLElement;
		return (event :MouseEvent) => {
			if(!_reactive.state.videoBox) _reactive.state.videoBox = true;
			if(_el) _el.classList.remove('is-active');
			(event.target as HTMLElement).classList.add('is-active');
			_el = (event.target as HTMLElement);
		}
	})();
</script>