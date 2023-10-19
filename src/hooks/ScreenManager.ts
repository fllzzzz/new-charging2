import {
	ref,
	onMounted
} from 'vue'

const currentRatio = ref<number[]>([]);
const currentSize = ref<number[]>([]);
const size = {
	width: 0,
	height: 0
};

function fn() {
	setTimeout(() => {
		currentSize.value.length = 0;
		currentRatio.value.length = 0;
		currentSize.value.push(
			window.innerWidth
		);
		currentSize.value.push(
			window.innerHeight
		);
		currentRatio.value.push(
			parseFloat((window.innerWidth / size.width).toFixed(3))
		)
		currentRatio.value.push(
			parseFloat((window.innerHeight / size.height).toFixed(3))
		)
	}, 20);
}

export default {
	currentRatio,
	currentSize,
	useCreate(width :number, height :number) {
		onMounted(() => {
			size.width = width; size.height = height;
			window.addEventListener('resize',
			fn);
		});
	},
	useDisponse() {
		window.removeEventListener('resize', fn);
	},
	useExecute() {
		onMounted(() => {
			if(! size.height || ! size.width) return;
			fn();
		});
	}
};