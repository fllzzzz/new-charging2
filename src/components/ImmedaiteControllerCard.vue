<style lang="scss">
	.immediate-card {
		pointer-events: none;
		.el-dialog {
			width: 422px;
			height: 272px;
			margin: 0;
			position: fixed;
			pointer-events: auto;
			.el-dialog__header {
				padding: 0;
				margin: 0;
				width: 0;
				height: 0;
				box-shadow: none;
				border: none;
			}
			.el-dialog__body {
				width: 100%;
				height: 100%;
				background-image: url('@/assets/images/background/immcontroller-card.png');
				background-repeat: no-repeat;
				background-size: contain;
				padding: 105px 51px 46px 50px;
				box-sizing: border-box;
				text-align: center;
				span {
					font-size: 24px;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #FFFFFF;
				}
				#btn-group {
					position: absolute;
					bottom: 35px;
					width: 215px;
					height: 43px;
					margin-left: 53px;
					margin-right: 53px;
					display: flex;
					flex-flow: row nowrap;
					justify-content: space-between;
					align-items: center;
					.btn {
						width: 77px;
						height: 43px;
						background-repeat: no-repeat;
						background-size: contain;
						text-align: center;
						line-height: 40px;
						span {
							font-size: 18px;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #FFFFFF;
							pointer-events: none;
						}
					}
					#yes {
						background-image: url('@/assets/images/background/btn-no.png');
					}
					#no {
						background-image: url('@/assets/images/background/btn-yes.png');
					}
				}
			}
		}
	}
</style>

<template>
	<div class="container immediate-card">
		<el-dialog
			v-model="state.dialogOpen"
			:append-to-body="false"
			:modal="false"
			:draggable="false"
			:show-close="false"
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			@closed="dialogClosedHandler"
		>
			<template #default>
				<span class="description">
					<slot name="text"></slot>
				</span>
				<div id="btn-group" @click="btnGroupClickHandler">
					<div class="btn" id="yes">
						<span class="description">是</span>
					</div>
					<div class="btn" id="no">
						<span class="description">否</span>
					</div>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
	import {
		ref,
		onMounted
	} from 'vue';

	const emits = defineEmits(['closed','confirm']);

	const props = defineProps({
		dialogOpen: {
			type: Boolean,
			required: true,
			default: () => false
		},
		currentStep: {
			type: String,
			required: true,
			default: undefined
		}
	});

	const dataBase = ref({
		currentStep: undefined as undefined | string
	});

	const state = ref({
		dialogOpen: false
	});

	const btnGroupClickHandler = (() => {
		let el :HTMLElement;
		return (e :MouseEvent) => {
			el = e.target as HTMLElement;
			if(el.id !== 'btn-group') {
				switch(el.id) {
					case 'yes':
						emits('confirm',dataBase.value.currentStep);
						state.value.dialogOpen = false;
						break;
					case 'no':
						state.value.dialogOpen = false;
						break;
				}
			}
		};
	})();

	const dialogClosedHandler = () => {
		emits('closed');
	};

	onMounted(() => {
		dataBase.value.currentStep = props.currentStep;
		state.value.dialogOpen = props.dialogOpen;
	});
</script>