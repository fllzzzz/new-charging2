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
			top: 5px;
			left: 274px;
			height: 36px;
			max-width: 460px;
			overflow: hidden;
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
			& > .box {
				&:last-child {
					margin-right: 0 !important;
				}
				@for $i from 1 to 6 {
					@if $i == 1 {
						&:nth-of-type(#{$i}) {
							width: 36px;
							height: 36px;
							margin-right: 3px;
							img {
								width: 100%;
								height: 100%;
								object-fit: contain;
							}
						}
					}@else {
						&:nth-of-type(#{$i}) {
							height: 14px;
							align-self: flex-end;
							margin-bottom: 5px;
							margin-right: 10px;
							display: flex;
							flex-flow: row nowrap;
							justify-content: flex-start;
							align-items: center;
							span:first-child {
								font-size: 16px;
								font-family: DINPro;
								font-weight: 400;
								color: #51F8DE;
								line-height: 19px;
							}
							span:last-child {
								font-size: 12px;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #FFFFFF;
								line-height: 19px;
								opacity: 0.6;
							}
						}
					}
				}
			}
		}
		#title {
			top: 28px;
			left: 771px;
			width: 379px;
			height: 33px;
			line-height: 33px;
			span {
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
				&:first-child {
					margin-left: 0 !important;
				}
				:deep(.el-badge) {
					pointer-events: none;
					.el-badge__content.is-fixed {
						right: 20px;
						top: 5px;
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
						}@else {
							width: 42px;
							height: 100%;
							margin-left: 30px;
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
			<span>2023-08-02 00:09:30</span>
		</div>
		<div class="item" id="weather">
			<div class="box">
				<img :src="_reactive.data.weatherIcon">
			</div>
			<template 
				v-for="item in _reactive.data.weatherInfoList" 
				:key="item.id"
			>
				<div class="box">
					<span>{{ item.value }}</span>
					<span>
						/{{
							item.type + weatherUnitMapper
								.get(item.type)
						}}
					</span>
				</div>
			</template>
		</div>
		<div class="item" id="title">
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
		reactive
	} from 'vue';

	const router = useRouter();

	const _reactive = reactive({
		data: {
			weatherIcon: require('@/assets/images/icon/多云.png'),
			weatherInfoList: [
				{
					id: 0,
					type: '温度',
					value: 300.1
				},
				{
					id: 1,
					type: '湿度',
					value: 368.4
				},
				{
					id: 2,
					type: '降雨',
					value: 302.3
				},
				{
					id: 3,
					type: '风速',
					value: 130.7
				},
			],
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

	const weatherUnitMapper = new Map<string, string>([
		['温度', '℃'],
		['湿度', '%'],
		['降雨', 'mm'],
		['风速', 'm/s'],
	])

	const clickEventInvoke = new Map<string, ((
		event :MouseEvent,
		...args :any[]
	) => void)>([
		['inspect-history', (event, ...args) => {
			router.push({name: 'inspect-history'});
		}]
	]);

	const clickDispenser = (event :MouseEvent) => {
		const id = (event.target as HTMLElement).id;
		const fn = clickEventInvoke.get(id);
		if(!fn) return;
		fn(event);
	};
</script>