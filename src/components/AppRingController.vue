<style lang="scss" scoped>
	.ring-controller {
		width: 178px;
		height: 178px;
		background-image: url('@/assets/images/background/ring.png');
		background-repeat: no-repeat;
		background-size: contain;
		position: relative;
		pointer-events: auto;
		img {
			width: 24px;
			height: 24px;
			object-fit: contain;
			position: absolute;
		}

		*:active {
			opacity: 0.3;
		}

		img#up {
			top: 15px;
			left: 77px;
		}

		img#right {
			top: 78px;
			right: 13px;
		}

		img#down {
			bottom: 11px;
			left: 77px;
		}

		img#left {
			left: 13px;
			top: 78px;
		}

		img#right-up {
			top: 36px;
			right: 32px;
		}

		img#right-down {
			bottom: 34px;
			right: 32px;
		}

		img#left-down {
			bottom: 34px;
			left: 32px;
		}

		img#left-up {
			top: 36px;
			left: 32px;
		}

		img#enlarge {
			top: 64px;
			left: 77px;
		}

		img#narrow {
			top: 94px;
			left: 77px;
		}
	}
</style>

<template>
	<div class="container ring-controller" @click="handleClick">
		<img :draggable="false" src="@/assets/images/icon/up.png" id="up">
		<img :draggable="false" src="@/assets/images/icon/right.png" id="right">
		<img :draggable="false" src="@/assets/images/icon/down.png" id="down">
		<img :draggable="false" src="@/assets/images/icon/left.png" id="left">
		<img :draggable="false" src="@/assets/images/icon/right-up.png" id="right-up">
		<img :draggable="false" src="@/assets/images/icon/right-down.png" id="right-down">
		<img :draggable="false" src="@/assets/images/icon/left-down.png" id="left-down">
		<img :draggable="false" src="@/assets/images/icon/left-up.png" id="left-up">
		<img :draggable="false" src="@/assets/images/icon/enlarge.png" id="enlarge">
		<img :draggable="false" src="@/assets/images/icon/narrow.png" id="narrow">
	</div>
</template>

<script setup lang="ts">
	const emits = defineEmits(['controller']);

	const handleClick = (e :MouseEvent) => {
		if(! (e.target as HTMLElement).id) return;

		emits('controller', (e.target as HTMLElement).id);
	}
</script>