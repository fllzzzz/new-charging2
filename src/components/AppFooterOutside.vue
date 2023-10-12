<style lang="scss" scoped>
	.footer-outside-container {
		width: 100vw;
		height: 100px;
		box-sizing: border-box;
		padding-top: 40px;
		pointer-events: none;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-size: 100%;
		opacity: 0.8;
		background-image: url('@/assets/images/background/index-footer-2.png');
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		.btn-group {
			width: 260px;
			height: 40px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			.btn {
				pointer-events: auto;
			}
			span {
				font-size: 23px;
				color: #FFFFFF;
				margin-bottom: 1.5px;
				&#video-inspect {
					margin-left: 16px;
				}
				&#digital-inspect {
					margin-right: 16.5px;
					margin-bottom: 2px;
				}
			}
		}
	}

	.inspect-confirm-box-container {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>

<template>
	<div class="footer-outside-container" @click="clickDispenser">
		<div class="item btn-group">
			<template 
				v-for="btn in _reactive.data.btnList"
				:key="btn.id"
			>
				<span
					class="btn"
					:id="btn.name"
					v-if="_reactive.data.activeBtn === btn.name ? false : true"
				>{{ setBtnLabel(btn.id) }}</span>
				<img
					class="btn"
					:draggable="false"
					:id="btn.name"
					:src="btn.image"
					v-if="_reactive.data.activeBtn === btn.name ? true : false"
				>
			</template>
		</div>
		<Teleport to="body" v-if="_reactive.state.inspectConfirmBox">
			<InspectConfirmBox
				:type="_reactive.data.inspectType"
				@close="inspectConfirmBoxEmitsDisperser('close', $event)"
			></InspectConfirmBox>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
	import InspectConfirmBox from './InspectConfirmBox.vue';

	import {
		reactive
	} from 'vue';

	const _reactive = reactive({
		data: {
			activeBtn: undefined as undefined | string,
			inspectType: undefined as undefined | string,
			btnList: [
				{
					id: 1,
					name: 'video-inspect',
					image: require('@/assets/images/background/video-inspect-1_active.png')
				},
				{
					id: 2,
					name: 'digital-inspect',
					image: require('@/assets/images/background/digital-inspect-1_active.png')
				},
			]
		},
		state: {
			inspectConfirmBox: false,
		}
	});

	const clickInvoke = new Map<string, ((
		event :MouseEvent,
		...args :any[]
	) => void)>([
		['video-inspect', (event) => {
			_reactive.state.inspectConfirmBox = true;
			_reactive.data.inspectType = '视频巡检'
			_reactive.data.activeBtn = (event.target as HTMLElement).id;
		}],
		['digital-inspect', (event) => {
			_reactive.state.inspectConfirmBox = true;
			_reactive.data.inspectType = '数字巡检'
			_reactive.data.activeBtn = (event.target as HTMLElement).id;
		}],
	]);

	const inspectConfirmBoxEmitsInvoke = new Map<string, ((
		...args :any[]
	) => void)>([
		['close', (...args) => {
			_reactive.data.activeBtn = undefined;
			_reactive.state.inspectConfirmBox = false;
		}]
	]);

	const clickDispenser = (event :MouseEvent) => {
		const id = (event.target as HTMLElement).id;
		const fn = clickInvoke.get(id);
		if(! fn) throw new Error('AppFooter@ faild get fn from clickInvoke');
		fn(event);
	};

	const inspectConfirmBoxEmitsDisperser = (emitType :string, ...args :any[]) => {
		const fn = inspectConfirmBoxEmitsInvoke.get(emitType);
		if(! fn) return;
		fn(...args);
	};

	const setBtnLabel = (id :number) => {
		switch (id) {
				case 1:
					return '视频巡检';
				case 2:
					return '数字巡检';
			}
	}
</script>