<style lang="scss" scoped>
	.inspectReport-digital-container {
		width: 605px;
		height: 652px;
		box-sizing: border-box;
		pointer-events: none;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		& > .item {
			width: 100%;
			box-sizing: border-box;
			pointer-events: auto;
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}
		#header {
			flex: 1;
			background-image: url('@/assets/images/background/header.png');
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			#title {
				margin-left: 13px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: center;
				img {
					width: 16px;height: 16px;
					object-fit: fill;
					margin-right: 11px;
				}
				span {
					font-size: 16px;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 22px;
				}
			}
			& > img {
				width: 24px;
				height: 22px;
				object-fit: fill;
				align-self: flex-start;
			}
		}
		#body {
			height: 618px;
			background-image: url('@/assets/images/background/body-2.png');
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-around;
			align-items: center;
			& > .box {
				box-sizing: border-box;
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
			#content {
				width: 567px;
				height: 483px;
				span {
					font-size: 14px;
					font-family: PingFangSC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 36px;
					&.is-error {
						color: #FB5741 !important;
					}
					&.is-success {
						color: #00BD54;
					}
				}
				.block {
					width: 100%;
					box-sizing: border-box;
				}
				.project {
					margin-bottom: 19px;
					&:last-child {
						margin-bottom: 0;
					}
					& > .row {
						width: 100%;
						height: 14px;
						display: flex;
						flex-flow: row nowrap;
						align-items: center;
						margin-bottom: 14px;
						&:last-child {
							margin-bottom: 0;
						}
						&:nth-of-type(1) {
							justify-content: space-between;
							span:last-child {
								margin-right: 23px;
							} 
						}
						&:not(:nth-of-type(1)) {
							.graph.dot {
								width: 5px;
								height: 5px;
								background: #00EAFF;
								margin-right: 8px;
							}
							letter-spacing: 1px;
						}
					}
					& > .col {
						height: 100%;
						display: flex;
					}
				}
			}
			#download {
				width: 88px;
				height: 32px;
				background-image: url('@/assets/images/background/btn-1.png');
				display: flex;
				flex-flow: row nowrap;
				justify-content: center;
				align-items: center;
				& > * {
					pointer-events: none;
				}
				span {
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
		}
	}

	:deep(.el-scrollbar) {
		.is-vertical {
			width: 6px;
			.el-scrollbar__thumb {
				background: #11E6F0;
				opacity: 0.48;
				border-radius: 3px;
			}
		}
	}
</style>

<template>
	<div class="inspectReport-digital-container">
		<div class="item" id="header">
			<div id="title">
				<img src="@/assets/images/icon/report.png">
				<span>巡检报告</span>
			</div>
			<img src="@/assets/images/icon/close.png">
		</div>
		<div class="item" id="body">
			<div class="box" id="content">
				<el-scrollbar
					:noresize="true"
				>
					<template #default>
						<template
							v-for="project, index in _reactive.data.contentList"
							:key="index"
						>
							<div class="block project">
								<div class="row">
									<span
										:class="getStatusClassNamer(project.items.length, false)"
									>{{ project.project }}</span>
									<span
										:class="getStatusClassNamer(project.items.length, true)"
									>
										{{ getStatus(project.items.length) }}
									</span>
								</div>
								<template v-if="project.items.length > 0">
									<template
										v-for="item, index in project.items"
										:key="index"
									>
										<div class="row">
											<div class="graph dot"></div>
											<span>{{ item.name }}：</span>
											<span class="is-error">{{ item.data[1] }}</span>
											<span>{{ unitMapper.get(item.data[0] as string) }}</span>
										</div>
									</template>
								</template>
							</div>
						</template>
					</template>
				</el-scrollbar>
			</div>
			<div class="box" id="download">
				<span>
					下载报告
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		reactive
	} from 'vue';

	const unitMapper = new Map<string, string>([
		['temp', '℃'],
		['湿度', '%'],
		['降雨', 'mm'],
		['风速', 'm/s'],
	])

	const _reactive = reactive({
		data: {
			contentList: [
				{
					project: '1号调相机-调相机本体-定子线圈',
					items: [
						{
							name: '1号调相机定子上下线棒层间温度4(CT004)',
							data: ['temp',120]
						},
						{
							name: '1号调相机定子上层线棒出水温度19(CT119)',
							data: ['temp',109]
						},
						{
							name: '1号调相机定子上层线棒出水温度19(滤波)',
							data: ['temp',200]
						},
						{
							name: '1号调相机定子上层线棒出水温度45(滤波)',
							data: ['temp',140]
						},
						{
							name: '1号调相机定子下层线棒出水平均温度(CT241-CT248)',
							data: ['temp',105]
						},
						{
							name: '1号调相机定子上下线棒层间温度4(CT004)',
							data: ['temp',120]
						},
						{
							name: '1号调相机定子上层线棒出水温度19(CT119)',
							data: ['temp',109]
						},
						{
							name: '1号调相机定子上层线棒出水温度19(滤波)',
							data: ['temp',200]
						},
						{
							name: '1号调相机定子上层线棒出水温度45(滤波)',
							data: ['temp',140]
						},
						{
							name: '1号调相机定子下层线棒出水平均温度(CT241-CT248)',
							data: ['temp',105]
						},
					]
				},
				{
					project: '1号调相机-调相机本体-定子铁心',
					items: []
				},
				{
					project: '1号调相机-调相机本体-定子线圈',
					items: [
						{
							name: '1号调相机定子上下线棒层间温度4(CT004)',
							data: ['temp',120]
						},
						{
							name: '1号调相机定子上层线棒出水温度19(CT119)',
							data: ['temp',109]
						},
						{
							name: '1号调相机定子上层线棒出水温度19(滤波)',
							data: ['temp',200]
						},
						{
							name: '1号调相机定子上层线棒出水温度45(滤波)',
							data: ['temp',140]
						},
						{
							name: '1号调相机定子下层线棒出水平均温度(CT241-CT248)',
							data: ['temp',105]
						},
						{
							name: '1号调相机定子上下线棒层间温度4(CT004)',
							data: ['temp',120]
						},
						{
							name: '1号调相机定子上层线棒出水温度19(CT119)',
							data: ['temp',109]
						},
						{
							name: '1号调相机定子上层线棒出水温度19(滤波)',
							data: ['temp',200]
						},
						{
							name: '1号调相机定子上层线棒出水温度45(滤波)',
							data: ['temp',140]
						},
						{
							name: '1号调相机定子下层线棒出水平均温度(CT241-CT248)',
							data: ['temp',105]
						},
					]
				},
			]
		}
	});

	const getStatusClassNamer = (length :number, show :boolean) => {
		if (length > 0) {
			return 'is-error';
		}else if(show) {
			return 'is-success';
		}else {
			return '';
		}
	};

	const getStatus = (length :number) => {
		if (length > 0) return '状态异常';
		else return '状态正常';
	};
</script>