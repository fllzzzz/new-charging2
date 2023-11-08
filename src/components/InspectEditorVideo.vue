<style lang="scss" scoped>
	.inspect-editor-box {
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url('@/assets/images/background/inspect-editor.png');
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		& > .item {
			box-sizing: border-box;
		}
		& > .item:nth-of-type(1) {
			width: 103px;
			height: 68px;
			display: flex;
			flex-flow: column nowrap;
			justify-content: flex-start;
			align-items: flex-end;
			& > .box {
				overflow: hidden;
				width: 100%;
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-end;
				align-items: flex-end;
				margin-bottom: 10px;
				&:last-child {
					margin-bottom: 0;
				}
			}
			& > .box:nth-of-type(1) {
				height: 26px;
				span:first-child {
					font-size: 36px;
					font-family: DINPro;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 26px;
				}
				span:last-child {
					font-size: 14px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					margin-left: 5px;
				}
			}
			& > .box:nth-of-type(2) {
				height: 12px;
				line-height: 12px;
				span {
					font-size: 12px;
					font-family: PingFangSC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
		}
		& > .item:nth-of-type(2) {
			width: 1154px;
			height: 62px;
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			align-items: flex-end;
			
			& > .row {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				box-sizing: border-box;
				span {
					font-size: 20px;
					font-family: PingFangSC;
					font-weight: 600;
					color: #25FFF8;
					text-shadow: 0px 1px 2px rgba(29,114,111,0.66);
				}
			}
			& > .row:nth-of-type(1) {
				width: 100%;
				height: 20px;
				justify-content:space-between;
			}
			& > .row:nth-of-type(2) {
				width: 1114px;
				height: 30px;
				justify-content: space-between;
			}
		}
		& > .item:nth-of-type(3) {
			width: 297px;
			height: 32px;
			margin-right: 24px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			pointer-events: none;
			& > .btn {
				pointer-events: auto;
				width: 88px;
				height: 32px;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-image: url('@/assets/images/background/btn-1.png');
				display: flex;
				flex-flow: row nowrap;
				justify-content: center;
				align-items: center;
				margin-right: 16px;
				& > * {
					pointer-events: none;
				}
				&:last-child {
					margin-right: 0;
				}
				img {
					width: 16px;
					height: 16px;
					object-fit: contain;
					margin-right: 5px;
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
	:deep(.el-input) {
		width: 1036px;
		height: 100%;
		.el-input__wrapper {
			background: transparent;
			box-shadow: 1px 2px 4px 1px rgba(29,114,111,0.66);
			border: 1px solid #FFFFFF;
			opacity: 0.7;
			border-radius: 2px;
		}
		.el-input__inner {
			color: #FFFFFF;
			letter-spacing: 1.25px;
		}
	}
	:deep(.el-checkbox) {
		margin-right: 55px;
		&:last-child {
			margin-right: 0;
		}
		.el-checkbox__label {
			font-size: 18px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
			text-shadow: 0px 1px 2px rgba(29,114,111,0.66);
		}
	}
	:deep(.el-checkbox__inner) {
		background-color: transparent;
	}

	.is-locked {
		opacity: 0.3;
		&:hover {
			cursor:not-allowed;
		}
	}
</style>

<template>
	<div class="inspect-editor-box">
		<div class="item">
			<div class="box">
				<span> {{ _reactive.data.inspectStatus.pace }} </span>
				<span>%</span>
			</div>
			<div class="box">
				<span> {{ _reactive.data.inspectStatus.status }} </span>
			</div>
		</div>
		<div class="item">
			<div class="row">
				<span>巡视情况：</span>
				<el-checkbox-group
					v-model="_reactive.data.cheeckBoxGroupData"
				>
					<template
						v-for="checkbox,index in _reactive.data.checkboxList"
						:key="index"
					>
						<el-checkbox
							:label="checkbox"
						></el-checkbox>
					</template>
				</el-checkbox-group>
			</div>
			<div class="row">
				<span>其他：</span>
				<el-input
					v-model="_reactive.data.inputBoxContent"
				></el-input>
			</div>
		</div>
		<div class="item"
			@click="clickEventHandler"
		>
			<template
				v-for="btn in _reactive.data.btnList"
				:key="btn.id"
			>
				<div class="btn" 
					:id="btn.name"
					:class="_reactive.data.btnLocker === btn.name ? 'is-locked' : ''"
				>
					<img :src="btn.image">
					<span>{{ btn.showName }}</span>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type {
		ctid_13021
	} from '@/types';

	import {
		usePublish,
		useSubscribe
	} from '@/hooks/EventEmitter';

	import {
		useInspectListGetter
	} from '@/hooks/InspectManager';

	import {
		useRouter
	} from 'vue-router';

	import {
		reactive
	} from 'vue';

	import type{
		PropType
	} from 'vue';

	type Model = 'maker' | 'editor' ;

	const props = defineProps({
		model: {
			type: String as PropType<Model>,
			required: false,
			default: undefined
		}
	});

	const emits = defineEmits(['destory']);

	const router = useRouter();

	const _reactive = reactive({
		data: {
			btnLocker: '',
			to3Dflg: 0,
			btnList: [
				{
					id: 1,
					name: 'preset',
					showName: '上一步',
					image: require<string>('@/assets/images/icon/preset.png')
				},
				{
					id: 2,
					name: 'next',
					showName: '下一步',
					image: require<string>('@/assets/images/icon/next.png')
				},
				{
					id: 3,
					name: 'exit',
					showName: '退出',
					image: require<string>('@/assets/images/icon/exit.png')
				},
			],
			checkboxList: useInspectListGetter(),
			inspectStatus: {
				pace: 0,
				status: 'default'
			},
			cheeckBoxGroupData: [] as string[],
			inputBoxContent: undefined as undefined | string,
		}
	});

	const clickEventInvoke = new Map<string, ((
		event?: MouseEvent,
		...args :any[]
	) => void)>([
		['exit', () => {
			if(props.model === 'editor') {
				emits('destory');
				return;
			}else if(props.model === 'maker') {
				router.back();
			}else {
				return;
			}
		}],
		['next', () => {
			_reactive.data.to3Dflg++;
			usePublish('setIframerMsg', {
				ctid: 13111,
				number: (_reactive.data.to3Dflg).toString()
			});
		}],
		['preset', () => {
			if(_reactive.data.to3Dflg < 1) return;
			_reactive.data.to3Dflg--;
			usePublish('setIframerMsg', {
				ctid: 13111,
				number: (_reactive.data.to3Dflg).toString()
			});
		}]
	]);

	useSubscribe<ctid_13021>('getIFramerMsg_13021', (ctx) => {
		_reactive.data.inspectStatus.pace = parseInt(ctx.percent);
	});

	const clickEventHandler = (event :MouseEvent) => {
		const id = (event.target as HTMLElement).id;

		if(_reactive.data.to3Dflg === 0) {
			if(id === 'preset') {
				_reactive.data.btnLocker = 'preset';
				event.preventDefault();
				return;
			}
		}else if(_reactive.data.to3Dflg > 0) {
			if(_reactive.data.inspectStatus.pace === 100)
				if(id === 'next') {
					_reactive.data.btnLocker = 'next';
					event.preventDefault();
					return;
				}
		}

		const fn = clickEventInvoke.get(id);
		if(!fn) return;
		fn()
	};
</script>