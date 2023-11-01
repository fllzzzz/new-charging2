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
	import {
		usePlayerCreater
	} from '@/hooks/videoManager';

/* 	usePlayerCreater('my-player').then(player => {
		player.src({
			type: "video/flv",
			src: "https://rtmp01open.ys7.com:9188/v3/openlive/L37649394_1_2.flv?expire=1698819640&id=639468789494190080&t=a31ddbba138802ce071c6736e18259e11300feb36b21ff52d06c95ce6ba5d10d&ev=100&supportH265=1"
		});
	}).catch(e => console.log(e)) */

	try {
		usePlayerCreater('my-player').then(player => {
			player.src({
				type: "video/flv",
				src: "https://rtmp01open.ys7.com:9188/v3/openlive/L37649394_1_2.flv?expire=1698819640&id=639468789494190080&t=a31ddbba138802ce071c6736e18259e11300feb36b21ff52d06c95ce6ba5d10d&ev=100&supportH265=1"
			});
		}).catch(e => console.log(e))
	} catch (error) {
		console.log(error);
	}
</script>