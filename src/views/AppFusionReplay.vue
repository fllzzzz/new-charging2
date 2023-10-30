<style lang="scss">
	div:has(.el-overlay-dialog) {
		pointer-events: none;
		.el-dialog#player-back {
			pointer-events: auto;
			background: transparent;
			width: 338px;
			height: 219px;
			margin: 0;
			position: fixed;
			top: 120px;
			right: 24px;
			display: flex;
			flex-flow: column nowrap;
			justify-content: flex-start;
			align-items: center;
			.el-dialog__header, .el-dialog__body  {
				width: 100%;
				box-sizing: border-box;
				background-repeat: no-repeat;
				background-size: contain;
			}
			.el-dialog__header {
				padding: 0;margin: 0;
				height: 33px;
				line-height: 33px;
				background-image: url('@/assets/images/background/header-1.png');
				img {
					width: 16px;
					height: 16px;
					object-fit: contain;
					margin-left: 14px;
					margin-right: 10px;
				}
				span {
					font-size: 16px;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
			.el-dialog__body {
				flex: 1;
				padding: 0;
				background-image: url('@/assets/images/background/body-1.png');
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-around;
				align-items: flex-start;
				.row {
					width: 100%;
					display: flex;
					flex-flow: row nowrap;
					justify-content: flex-start;
					align-items: center;
					& > span {
						font-size: 14px;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						margin-left: 25px;
						margin-right: 14px;
					}
				}
				#datetime-picker {
					width: 220px;
					height: 32px;
					.el-input__wrapper {
						width: 100%;
						height: 100%;
						box-shadow: none;
						background-color: transparent;
						border: 1px solid #00E0D8;
						background: linear-gradient(0deg, #069E99 0%, #17C7C1 100%);
						opacity: 0.8;
						.el-input__prefix {
							.el-input__icon {display: none;}
							.el-input__prefix-inner::after {
								content: '';
								width: 24px;
								height: 24px;
								display: block;
								margin-right: 12px;
								background-image: url('@/assets/images/icon/cal.png');
								background-repeat: no-repeat;
								background-size: contain;
							}
						}
						.el-input__inner {
							&::placeholder {
								font-size: 14px;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #FFFFFF;
							}
							font-size: 14px;
							font-family: DIN;
							font-weight: 400;
							color: #FFFFFF;
						}
					}
				}
				#row-3 {
					justify-content: center;
					.el-button {
						width: 88px;
						height: 32px;
						border: none;
						font-size: 14px;
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: #FFFFFF;
						background: rgba(0,234,255,0.6);
					}
				}
			}
		}
	}
</style>

<template>
	<el-dialog
		id="player-back"
		v-model="state.dialogShow"
		:append-to-body="true"
		:modal="false"
		:draggable="false"
		:show-close="false"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		:destroy-on-close="true"
	>
		<template #header>
			<img src="#">
			<span class="description">融合回放</span>
		</template>
		<template #default>
			<div class="row" id="row-1">
					<span class="description">开始时间</span>
					<div id="datetime-picker">
						<el-date-picker
							type="datetime"
							v-model="dataBase.startTime"
							format="YYYY-MM-DD HH:mm:ss"
							value-format="YYYY-MM-DD HH:mm:ss"
							placeholder="选择日期时间"
						></el-date-picker>
					</div>
			</div>
			<div class="row" id="row-2">
					<span class="description">结束时间</span>
					<div id="datetime-picker">
						<el-date-picker
							type="datetime"
							v-model="dataBase.endTime"
							format="YYYY-MM-DD HH:mm:ss"
							value-format="YYYY-MM-DD HH:mm:ss"
							placeholder="选择日期时间"
						></el-date-picker>
					</div>
			</div>
			<div class="row" id="row-3">
					<el-button>开始回放</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
	import {
		usePublish
	} from '@/hooks/EventEmitter';

	import {
		ref
	} from 'vue';

	import {
		useRoute
	} from 'vue-router'

	const route = useRoute();

	const state = ref({
		dialogShow: true
	});

	const dataBase = ref({
		startTime: '',
		endTime: '',
	});
	usePublish('AppHeaderL2State', true);
	usePublish('AppSmartGuardState', false);
	usePublish('AppFooterModel', 'inside');
	usePublish('AppFooterState', true);

	usePublish('setIframerMsg', {
		ctid: 12511
	});
</script>