<style lang="scss" scoped>
	.header-container {
		width: 100vw;
		height: 200px;
		pointer-events: none;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-size: contain;
		background-image: url('@/assets/images/background/index-header.png');
		& > .item {
			position: absolute;
			pointer-events: auto;
		}
		#clock {
			top: 17px;
			left: 30px;
			width: 216px;
			height: 22px;
			span {
				font-size: 22px;
				font-family: LESLIE;
				font-weight: 400;
				color: #00AFB3;
			}
		}
		#weather {
			position: absolute;
			left: vw(280);
			top: vw(5);
		}
		#title {
			top: 28px;
			left: 771px;
			width: 379px;
			height: 33px;
			line-height: 33px;
			span {
				pointer-events: none;
				font-size: 45px;
				font-family: YouSheBiaoTiHei;
				font-weight: 400;
				color: #FFFFFF;
				text-shadow: 0px 3px 2px rgba(2,37,36,0.8);
				text-align: center;
			}
		}
		#option-group {
			top: 8px;
			right: 22px;
			height: 33px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-end;
			justify-content: center;
			& > .box {
				margin-left: 30px;
				height: 100%;
				&:first-child {
					margin-left: 0 !important;
				}
				:deep(.el-badge) {
					pointer-events: none;
					height: 100%;
					.el-badge__content.is-fixed {
						right: 22px;
						top: 5px;
						width: 21px;
						height: 19px;
						@media screen and (min-width: 2160px){
							right: 33px;
							top: 12px;
							width: 34px;
							height: 30px;
						}
					}
					img {
						width: 100%;height: 100%;
						object-fit: fill;
					}
				}
				@for $i from 1 to 4 {
					&:nth-of-type(#{$i}) {
						@if $i == 1 {
							:deep(.el-badge) {
								.el-badge__content.is-fixed {
									background: linear-gradient(0deg, #1D726F 0%, #219E9A 100%);
									opacity: 0.9;
									border-radius: 10px;
								}
							}
						}
						@if $i == 2 {
							:deep(.el-badge) {
								.el-badge__content.is-fixed {
									background: linear-gradient(0deg, #D93131 0%, #FD6C6C 100%);
									opacity: 0.9;
									border-radius: 10px;
								}
							}
						}
						@if $i == 3 {
							width: 74px;
							height: 14px;
							align-self: center;
							margin-left: 33px;
							display: flex;
							flex-flow: row nowrap;
							justify-content: space-between;
							align-items: center;
							span {
								font-size: 14px;
								font-family: PingFangSC;
								font-weight: 500;
								color: #6EFFF6;
							}
							#triangle {
								width: 0;height: 0;
								border-top: 6px solid #6EFFF6;
								border-left: 5px solid transparent;
								border-right: 5px solid transparent;
							}
						}
					}
				}
			}
		}
	}
</style>

<template>
	<div class="header-container">
		<div class="item" id="clock">
			<AppHeaderClock></AppHeaderClock>
		</div>
		<div class="item" id="weather">
			<HeaderWeather></HeaderWeather>
		</div>
		<div class="item" id="title"
			@click="clickDispenser"
		>
			<span>充电站智慧管家系统</span>
		</div>
		<div class="item" id="option-group">
			<template 
				v-for="item in _reactive.data.inspectInfoList"
				:key="item.id"
			>
				<div class="box" :id="'inspect-' + item.type"
					@click="clickDispenser"
				>
					<el-badge
						:hidden="item.hidden"
						:value="item.value"
					>
						<template #default>
							<img :src="item.image">
						</template>
					</el-badge>
				</div>
			</template>
			<div class="box" id="user">
				<span>用户账号</span>
				<div class="graph" id="triangle"></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		useRouter
	} from 'vue-router';

	import {
		stationID
	} from '@/store';

	import {
		reactive
	} from 'vue';
	import {
		usePublish
	} from '@/hooks/EventEmitter';

	import AppHeaderClock from './AppHeaderClock.vue';
	import HeaderWeather from './HeaderWeather.vue';
	const router = useRouter();

	const _reactive = reactive({
		data: {
			inspectInfoList: [
				{
					id: 1,
					type: 'history',
					hidden: false,
					image: require('@/assets/images/icon/inspect-history.png'),
					value: 10
				},
				{
					id: 2,
					type: 'warn',
					hidden: false,
					image: require('@/assets/images/icon/inspect-warn.png'),
					value: 20
				},
			]
		}
	});

	const clickEventInvoke = new Map<string, ((
		event :MouseEvent,
		...args :any[]
	) => void)>([
		['inspect-history', (event, ...args) => {
			router.push({
				name: 'inspect-data',
				params: {
					model: 'history'
				}
			});
		}],
		['inspect-warn', (event, ...args) => {
			router.push({
				name: 'inspect-data',
				params: {
					model: 'warn'
				}
			});
		}],
		['title', (event, ...args) => {
			
			router.push({
				name: 'map',
			}).then(() => {
				stationID.value = undefined;
				usePublish('setIframerMsg', {
					ctid: 10111
				});
			})
		}],
	]);

	const clickDispenser = (event :MouseEvent) => {
		const id = (event.target as HTMLElement).id;
		const fn = clickEventInvoke.get(id);
		if(!fn) return;
		fn(event);
	};
</script>