<style lang="scss" scoped>
	@font-face {
		font-family: LESLIE;
		src: url('@/assets/fonts/LESLIEB.ttf');
	}

	.header-clock {
		& > .wrapper {
			display: flex;
			// flex-flow: row nowrap;
			// justify-content: flex-start;
			// align-items: flex-start;
			#date {
				// margin-right: 36px;
				// align-self: flex-end;
				span {
					font-size: 22px;
					font-family: LESLIE;
					font-weight: 400;
					color: #00AFB3;
				}
			}
			#time {
				font-size: 22px;
				font-family: LESLIE;
				font-weight: 400;
				color: #00AFB3;
				line-height: 1;
				margin-left: 10px;
			}
		}
	}
</style>

<template>
	<div class="header-clock">
		<div class="wrapper">
			<div id="date">
				<template
					v-for="(item, index) in dateTime.slice(0, 3)" :key="index"
				>
					<span id="value">{{ valueFormater(item) }}</span>
					<span id="split"
						v-if="! (index === dateTime.slice(0, 3).length - 1)"
					>-</span>
				</template>
			</div>
			<div id="time">
				<template
					v-for="(item, index) in dateTime.slice(3)" :key="index"
				>
					<span id="value">{{ valueFormater(item) }}</span>
					<span id="split"
						v-if="! (index === dateTime.slice(3).length - 1)"
					>:</span>
				</template>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import {
		reactive,
		onMounted,
		onUnmounted
	} from 'vue';

	let timer :number | undefined = undefined;
	const dateTime = reactive<number[]>([]);

	const init = () => {
		const date = new Date();

		date.toLocaleDateString().split('/')
			.map(item => parseInt(item))
			.concat(
				date.toLocaleTimeString().split(':')
					.map(item => parseInt(item))
			).forEach((item, index) => {
				dateTime[index] = item;
			});
	};

	const valueFormater = (
		value :number
	) => {
		if(value < 10) return `0${value}`;
		return `${value}`;
	};

	onMounted(() => {
		timer = setInterval(init, 1000);
	});

	onUnmounted(() => {
		clearInterval(timer);
	});
</script>