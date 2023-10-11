<style lang="scss" scoped>
	.footer-container {
		width: 100vw;
		height: 53px;
		pointer-events: none;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-size: contain;
		opacity: 0.8;
		background-image: url('@/assets/images/background/index-footer.png');
		& > .item {
			pointer-events: auto;
			position: absolute;
			bottom: 44px;
			width: 122px;
			height: 45px;
			background-repeat: no-repeat;
			background-size: contain;
		}
		#video-inspect {
			left: 823px;
			background-image: url('@/assets/images/background/btn_video-inspect.png');
		}
		#digital-inspect {
			left: 975px;
			background-image: url('@/assets/images/background/btn_digital-inspect.png');
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
	<div class="footer-container" @click="clickDispenser">
		<div class="item" id="video-inspect"></div>
		<div class="item" id="digital-inspect"></div>
		<Teleport to="body" v-if="_reactive.state.inspectConfirmBox">
			<InspectConfirmBox
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
		state: {
			inspectConfirmBox: false
		}
	});

	const clickInvoke = new Map<string, ((
		event :MouseEvent,
		...args :any[]
	) => void)>([
		['video-inspect', (event) => {
			_reactive.state.inspectConfirmBox = true;
		}]
	]);

	const inspectConfirmBoxEmitsInvoke = new Map<string, ((
		...args :any[]
	) => void)>([
		['close', (...args) => {
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
</script>