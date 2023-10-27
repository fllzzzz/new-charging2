<style lang="scss" scoped>
	.smart-guard-container {
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
			box-sizing: border-box;
			height: 100%;
			border: 2px dotted red;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
		}
		& > .item:nth-of-type(1) {
			width: 189px;
		}
		& > .item:nth-of-type(2) {
			justify-content: flex-start;
			width: 552px;
			.graph.dot {
				width: 5px;
				height: 5px;
				background: rgba(0,255,255,0.5);
				border: 1px solid #00FFFF;
				border-radius: 50%;
				margin-right: 8px;
			}
			span {
				font-size: 14px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				opacity: 0.9;
				&.time {
					margin-right: 16px;
				}
			}
		}
	}
</style>

<template>
	<div class="smart-guard-container">
		<div class="item">
			
		</div>
		<div class="item">
			<div class="graph dot"></div>
			<span
				class="time"
			>
				{{ new Date().toLocaleString() }}
			</span>
			<span
				class="content"
			>
				<span>{{ _reactive.data.broadCastMsg }}</span>
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		ctid_14521
	} from '@/types';

	import {
		useMsgHandler
	} from '@/hooks/messageManager';

	import {
		useSubscribe
	} from '@/hooks/EventEmitter';

	import {
		reactive
	} from 'vue';

	const _reactive = reactive({
		data: {
			broadCastMsg: 'default msg'
		}
	});

	useSubscribe<ctid_14521>('getIFramerMsg_14521', (ctx) => {
		const msg = useMsgHandler<ctid_14521>('info', ctx);
		if(!msg) return;
		if(msg.ctx.StationID) {
			_reactive.data.broadCastMsg = msg.ctx.StationName + msg.ctx.Report;
		}
	})
</script>