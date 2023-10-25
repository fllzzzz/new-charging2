<style lang="scss">
	.el-dialog {
		margin: 0;
		position: absolute;
		top: 50%;left: 50%;
		transform: translate(-50%, -50%);
		width: 422px;
		background-color: transparent;
		.el-dialog__header {
			display: none;
		}
		.el-dialog__body {
			height: 272px;
			padding: unset;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('@/assets/images/background/hight-temp.png');
			#content-container {
				width: 220px;
				height: 58px;
				position: absolute;
				top: 74px;
				left: 114px;
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-between;
				align-items: center;
				& > .item {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: flex-start;
				}
				& > .item:nth-of-type(1) {
					width: 100%;
					height: 18px;
					font-size: 18px;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
				}
				& > .item:nth-of-type(2) {
					margin-right: 25px;
					width: 150px;
					height: 24px;
					font-size: 24px;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #FFFFFF;
					text-shadow: 0px 38px 120px #8E000D;
				}
			}
			#btn {
				width: 77px;
				height: 43px;
				position: absolute;
				top: 183px;
				left: 171px;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-image: url('@/assets/images/background/btn-no.png');
				display: flex;
				justify-content: center;
				align-items: center;
				& > * {
					pointer-events: none;
				}
				span {
					font-size: 18px;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					margin-bottom: 3px;
				}
			}
		}
	}
</style>

<template>
	<el-dialog
		v-model="_reactive.state.dialog"
		:modal="true"
		:append-to-body="true"
		:lock-scroll="true"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		:draggable="false"
		:show-close="false"
	>
		<template #default>
			<div id="content-container">
				<div class="item">
					{{
						alarmNameMapper.get(_reactive.data.msg.type) +
						'为' +
						_reactive.data.msg.data +
						unitMapper.get(_reactive.data.msg.type) +
						',请立即查看'
					}}
				</div>
				<div class="item">
					{{
						alarmLevelMapper.get(_reactive.data.msg.type)
						?.get(_reactive.data.msg.data) +
						'预警'
					}}
				</div>
			</div>
			<div id="btn"
				@click="clickHandler"
			>
				<span>确定</span>
			</div>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
	import {
		reactive
	} from 'vue';

	import {
		useRouter
	} from 'vue-router';

	const router = useRouter();

	const alarmNameMapper = new Map<string, string>([
		['temp', '温度']
	]);

	const unitMapper = new Map<string, string>([
		['temp', '℃'],
		['湿度', '%'],
		['降雨', 'mm'],
		['风速', 'm/s'],
	])

	const alarmLevelMapper = new Map<string, Map<number, string>>([
		['temp', new Map([
			[100, '高温橙色']
		])]
	])

	const _reactive = reactive({
		state: {
			dialog: true
		},
		data: {
			msg: {
				type: 'temp',
				data: 100,
			}
		}
	});

	const clickHandler = () => {
		router.push({
			name: 'immediate-controller'
		});
	};
</script>