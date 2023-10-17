<style lang="scss" scoped>
	.scene-controller {
		width: 100vw;
		height: 100vh;
		position: absolute;
		background: transparent;
		box-sizing: border-box;
		pointer-events: none;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: flex-start;
		padding-top: 120px;
		padding-bottom: 21px;
		& > .item {
			box-sizing: border-box;
			pointer-events: auto;
			background-repeat: no-repeat;
			background-size: contain;
		}
		& > .item#handle-setups {
			width: 300px;
			height: 610px;
			background-image: url('@/assets/images/background/immcontroller-handle-list.png');
			padding-top: 15px;
			& > span {
				font-size: 16px;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #00FFFF;
				margin-left: 18px;
			}
			#time-line {
				width: 100%;
				height: 100%;
				margin-top: 25px;
			}
			:deep(.el-timeline) {
				.el-timeline-item {
					.el-timeline-item__tail {
						border-left: 3px solid #00FFFF;
					}
					.el-timeline-item__dot {
						width: 20px;
						height: 20px;
						background: #1D9DFF;
						border-radius: 4px;
						left: -5px;
						span {
							font-size: 14px;
							font-family: DINPro;
							font-weight: 500;
							color: #FFFFFF;
						}
					}
					.el-timeline-item__wrapper {
					.el-timeline-item__timestamp {
							font-size: 16px;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #FFFFFF;
						}
						.el-timeline-item__content {
							display: flex;
							flex-flow: column nowrap;
							justify-content: flex-start;
							align-items: flex-start;

							span.text {
								font-size: 14px;
								font-family: Adobe Heiti Std;
								font-weight: normal;
								color: #FFFFFF;
							}

							span.time {
								font-size: 12px;
								font-family: DIN;
								font-weight: 400;
								color: #FFFFFF;
							}
							.item {
								width: 100%;
								height: 30px;
								margin-bottom: 15px;
								display: flex;
								flex-flow: column nowrap;
								justify-content: flex-start;
								align-items: flex-start;
								.row {
									img {
										width: 16px;
										height: 16px;
										object-fit: contain;
										margin-right: 6px;
									}
									display: flex;
									flex-flow: row nowrap;
									justify-content: flex-start;
									align-items: center;
								}
								#row2 {
									align-self: flex-end;
									margin-right: 75px;
								}
							}
						}
					}
				}
			}
		}
	}
</style>

<template>
	<div class="container scene-controller">
		<div class="item" id="handle-setups">
			<span class="description">处理步骤</span>
			<div id="time-line">
				<el-timeline>
					<el-timeline-item :timestamp="'告警视频列表'" placement="top" color="#1D9DFF">
						<template #dot>
							<span class="descriptipn">1</span>
						</template>
						<template #default>
							<template v-for="index in 3" :key="index">
								<div class="item" :id="index.toString()">
									<div class="row" id="row1">
										<img src="@/assets/images/icon/monitor.png">
										<span class="description text">1号充电桩东北角</span>
									</div>
									<div class="row" id="row2">
										<span class="description time">20230826 12:24:06</span>
									</div>
								</div>
							</template>
						</template>
					</el-timeline-item>
					<el-timeline-item :timestamp="'通知及维护负责人'" placement="top" color="#1D9DFF">
						<template #dot>
							<div id="dot">
								<span class="description">2</span>
							</div>
						</template>
						<template #default>
							<span class="description text">刘某某，18765432110</span>
							<span class="description time">2023-07-21 14:51:20</span>
						</template>
					</el-timeline-item>
					<el-timeline-item :timestamp="'维护负责人到位'" placement="top" color="#1D9DFF">
						<template #dot>
							<div id="dot">
								<span class="description">3</span>
							</div>
						</template>
						<template #default>
							<span class="description time">2023-07-21 14:51:20</span>
						</template>
					</el-timeline-item>
					<el-timeline-item :timestamp="'处理现场问题'" placement="top" color="#1D9DFF">
						<template #dot>
							<div id="dot">
								<span class="description">4</span>
							</div>
						</template>
						<template #default>
							<span class="description time">2023-07-21 14:51:20</span>
						</template>
					</el-timeline-item>
					<el-timeline-item :timestamp="'确认现场照片'" placement="top" color="#1D9DFF">
						<template #dot>
							<div id="dot">
								<span class="description">5</span>
							</div>
						</template>
						<template #default>
						</template>
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
</script>