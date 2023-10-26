<style lang="scss" scoped>
	.inspect-report-handle-container {
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
	.scollbar-slot-container {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: flex-start;
		#steps {
			max-width: 225px;
			margin-top: 13px;
		}
		#images {
			width: 250px;
			height: 146px;
			margin-right: 37px;
			img {
				width: 100%;height: 100%;
				object-fit: fill;
			}
		}
	}
	.step-container {
		margin-top: 14px;
	}
</style>

<template>
	<div class="inspect-report-handle-container">
		<div class="item" id="header">
			<div id="title">
				<img src="@/assets/images/icon/report.png">
				<span>巡检报告</span>
			</div>
			<img src="@/assets/images/icon/close.png"
				@click="closeHandler"
			>
		</div>
		<div class="item" id="body">
			<div class="box" id="content">
				<el-scrollbar
					:noresize="true"
				>
					<template #default>
						<div class="scollbar-slot-container">
							<div class="box" id="steps">
								<AppHandleSteps
									class="step-container"
								></AppHandleSteps>
							</div>
							<div class="box" id="images">
								<template
									v-for="img, index in _reactive.data.imageList"
									:key="index"
								>
									<img :src="img">
								</template>
							</div>
						</div>
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
	import AppHandleSteps from './AppHandleSteps.vue';

	import {
		reactive
	} from 'vue';

	const _reactive = reactive({
		data: {
			imageList: [
				require<string>('@/assets/images/background/test-1.png'),
				require<string>('@/assets/images/background/test-1.png'),
				require<string>('@/assets/images/background/test-1.png'),
				require<string>('@/assets/images/background/test-1.png'),
				require<string>('@/assets/images/background/test-1.png'),
				require<string>('@/assets/images/background/test-1.png'),
			]
		}
	});

	const emits = defineEmits(['close']);

	const closeHandler = () => {
		emits('close');
	};
</script>