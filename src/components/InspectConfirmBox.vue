<style lang="scss" scoped>
	.inspect-confirm-box-container {
		user-select: none;
		width: 714px;
		height: 422px;
		pointer-events: none;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-size: contain;
		background-image: url('@/assets/images/background/inspect-confirm-box.png');
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-around;
		align-items: center;
		padding-left: 45px;
		padding-right: 24px;
		& > .item {
			width: 100%;
			pointer-events: auto;
		}
		#header, #btn-group {
			height: 32px;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
		}
		#header {
			justify-content: flex-end;
			span {
				font-size: 20px;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #FFFFFF;
				margin-right: 260px;
			}
			img {
				width: 32px;
				height: 32px;
			}
		}
		#btn-group {
			justify-content: center;
			& > .btn {
				width: 88px;
				height: 32px;
				margin-right: 50px;
				text-align: center;
				line-height: 28px;
				background-repeat: no-repeat;
				background-size: contain;
				background-image: url('@/assets/images/background/btn-1.png');
				span {
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #FFFFFF;
				}
				&:last-child {
					margin-right: 0;
				}
				& > * {
					pointer-events: none;
				}
			}
		}
		#content {
			height: 282px;
		}
	}

	.scrollbar-slot-container {
		height: 290px;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		& > .row {
			width: 98%;
			margin-bottom: 29px;
			display: flex;
			flex-flow: var(--flex-main-direction) nowrap;
			justify-content: flex-start;
			align-items: flex-start;
			&:first-child {
				margin-top: 22px;
			}
			&:last-child {
				margin-bottom: 0;
			}
			span:first-child {
				font-size: 16px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
			}
			span:last-child {
				margin-top: 3.5px;
				font-size: 14px;
				font-family: MiSans;
				font-weight: 300;
				color: #FFFFFF;
			}
		}
	}
</style>

<template>
	<div class="inspect-confirm-box-container">
		<div class="item" id="header">
			<span>巡检任务</span>
			<img id="close" src="@/assets/images/icon/close-1.png"
				@click="clickDispenser"
			>
		</div>
		<div class="item" id="content">
			<BaseScrollbar>
				<template #context>
					<div class="scrollbar-slot-container">
						<template 
							v-for="item in _reactive.data.contentList"
							:key="item.id"
						>
							<div class="row"
								:style="{
									'--flex-main-direction': item.options.wrap ?
										'column' : 'row'
								}"
							>
								<span>{{ item.title }}： </span>
								<span>{{ item.value }}</span>
							</div>
						</template>
					</div>
				</template>
			</BaseScrollbar>
		</div>
		<div class="item" id="btn-group"
			@click="clickDispenser"
		>
			<div class="btn" id="cancel">
				<span>取消巡检</span>
			</div>
			<div class="btn" id="confirm">
				<span>确认巡检</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import BaseScrollbar from './BaseScrollbar.vue';

	import {
		reactive
	} from 'vue';

	const emits = defineEmits(['close']);

	const props = defineProps({
		type: {
			type: String,
			required: true,
			default: undefined
		}
	});

	const _reactive = reactive({
		data: {
			contentList: [
				{
					id: 1,
					title: '巡检方式',
					value: props.type,
					options: {}
				},
				{
					id: 1,
					title: '任务时间',
					value: new Date().toLocaleString(),
					options: {}
				},
				{
					id: 1,
					title: '巡检任务',
					value: '摄像头数量,监控范围,巡查日期,设备运行情况,巡检员备注,功能处理结果,下载报告；',
					options: {
						wrap: true,
					}
				},
			]
		}
	});

	const clickInvoke = new Map<string | string[], ((
		event :MouseEvent,
		...args :any[]
	) => void)>([
		[['cancel', 'close'], (event) => {
			emits('close',999);
		}],
	]);

	const clickDispenser = (event :MouseEvent) => {
		const id = (event.target as HTMLElement).id;
		let fn :(
			event :MouseEvent,
			...args :any[]
		) => void;
		for(let i of clickInvoke) {
			if (typeof i === 'string'){
				if(i[0] === id) {
					fn = i[1];
					fn(event);
					return;
				}
			}else {
				if(i[0].includes(id)){
					fn = i[1];
					fn(event);
					return;
				}
			}
		}
	};
</script>