<style lang="scss" scoped>
	.smart-guard-container {
		overflow: hidden;
		width: 841px;
		height: 58px;
		pointer-events: none;
		box-sizing: border-box;
		background-color: RGBA(17, 109, 98, 1);
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: center;
		& > .item {
			pointer-events: auto;
			box-sizing: border-box;
			height: 100%;
			border: 2px dotted red;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
		}
		& > .item:nth-of-type(1) {
			width: 189px;
			justify-content: space-between;
			& > .box {
				border: 2px dotted red;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
			}
			& > .box:nth-of-type(1) {
				
			}
			& > .box:nth-of-type(2) {
				span {
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					opacity: 0.9;
					&#day-num {
						font-size: 26px;
						font-family: 'DINPro';
						font-weight: 500;
						color: #00FFFF;
						margin-left: 5px;
						margin-right: 8px;
						margin-bottom: 3px;
					}
				}
			}
		}
		& > .item:nth-of-type(2) {
			justify-content: flex-start;
			width: 552px;
			span {
				font-size: 14px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				opacity: 0.9;
			}
		}
	}
	.v-enter-active,
	.v-leave-active
	{
		transition-duration: 0.75s;
		transition-property: transform;
	}
	.v-enter-active {
		transition-timing-function: ease;
	}
	.v-leave-active {
		transition-timing-function: ease-in;
	}
	.v-enter-from {
		transform: translateY(150%);
	}
	.v-leave-to {
		transform: translateY(-150%);
	}
</style>

<template>
	<div class="smart-guard-container">
		<div class="item">
			<div class="box"></div>
			<div class="box">
				<span>已守护</span>
				<span id="day-num">{{ _reactive.data.dayNum }}</span>
				<span>天</span>
			</div>
		</div>
		<div class="item">
			<Transition
				@before-enter="transitionOnBeforeEnter"
				@after-leave="transitionOnBeforeLeave"
			>
				<span v-show="_reactive.state.msgBox">
					{{ new Date().toLocaleString() + '&emsp;'}}
					{{ _reactive.data.msg }}
				</span>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		useMsgHandler
	} from '@/hooks/messageManager';

	import type{
		ctid_14521
	} from '@/types'; 

	import {
		useSubscribe
	} from '@/hooks/EventEmitter';

	import {
		usePullMessage,
		usePushMessage
	} from '@/hooks/messageQueue';

	import {
		reactive,
		onMounted
	} from 'vue';

	const _reactive = reactive({
		state: {
			msgBox: true,
		},
		data: {
			msg: '无信息',
			dayNum: 100
		}
	});

	const _static = {
		data: {
			msg: undefined as undefined | string,
		}
	};

	useSubscribe<ctid_14521>('getIFramerMsg_14521', (ctx) => {
		const msg = useMsgHandler<ctid_14521>('info', ctx);
		if(!msg) return;
		if(msg.ctx.StationID) {
			usePushMessage(msg.ctx.StationName + msg.ctx.Report);
		}
	})

	const transitionOnBeforeEnter = () => {
		_reactive.data.msg = _static.data.msg!;
	};

	const transitionOnBeforeLeave = () => {
		setTimeout(() => {
			_reactive.state.msgBox = ! _reactive.state.msgBox
		}, 20)
	};

	onMounted(() => {
		setInterval(() => {
			_static.data.msg = usePullMessage();
			if(_static.data.msg) {
				_reactive.state.msgBox = ! _reactive.state.msgBox
			}
		}, 3000)
	})
</script>