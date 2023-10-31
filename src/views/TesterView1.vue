<style lang="scss">
#my-player {
	width: 800px;
	height: 500px;
}
</style>

<template>
	<video id="my-player" ish265 islive hasvideo>
			
	</video>
</template>

<script setup lang="ts">
import 'video.js/dist/video-js.css';

import videojs from "video.js";
import 'videojs-flvjs-es6';

import {
	onMounted
} from 'vue';

onMounted(() => {
	const player = videojs('my-player', {
		flvjs: {
			mediaDataSource: {
				isLive: true,
				cors: true,
				withCredentials: false,
			},
		}
	}, function(this :any) {
		this.src({
			type: "video/flv",
			src: "https://rtmp01open.ys7.com:9188/v3/openlive/L37649394_1_2.flv?expire=1698819640&id=639468789494190080&t=a31ddbba138802ce071c6736e18259e11300feb36b21ff52d06c95ce6ba5d10d&ev=100&supportH265=1"
		});
	});

	console.log('jx', player);
});

</script>