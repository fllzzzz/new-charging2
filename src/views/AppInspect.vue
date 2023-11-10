<style lang="scss" scoped>
	.inspect-container {
		width: 100vw;
		height: 91px;
		position: fixed;
		bottom: 0;
	}
	.is-small {
		position: fixed;
		top: 129px;
		right: 27px;
		:deep(#body) {
			padding: 10px;
			box-sizing: border-box;
		}
	}
	.is-middle {
		position: fixed;
		top: 220px;
		right: 300px;
		:deep(#body > #left) {
			padding: 10px;
			box-sizing: border-box;
		}
	}

	:deep(#my-player) {
		width: 100%;
		height: 100%;
		object-fit: fill;
	}

	.report-container {
		position: fixed;
		top: 100px;
		right: 30px;
	}
</style>

<template>
	<div class="inspect-container">
		<InspectEditorVideo
			model="maker"
			@open-report="openReportHandler"
		></InspectEditorVideo>
		<component
			class="video-target"
			:is="_reatcive.data.videoBoxComp"
			:class="boxClassNameSetter"
		></component>
		<Teleport
			:to="_reatcive.data.teleportTarget"
		>
			<video
				id="my-player"
				v-show="_reatcive.state.video"
			></video>
		</Teleport>
		<InspectReportVideo
			class="report-container"
			:dispable-editor="true"
			v-if="_reatcive.state.report"
		></InspectReportVideo>
	</div>
</template>

<script setup lang="ts">
	import InspectReportVideo from '@/components/InspectReportVideo.vue';

	import type {
		Component
	} from 'vue';

	import {
		reactive,
		computed,
		onMounted,
		watch,
		nextTick
	} from 'vue';

	import {
		videoBox,
		useChangeModle
	} from '@/hooks/videoBoxManager';

	import {
		ctid13511_isSet
	} from '@/store';

	import Hunter from '@/utils/Hunter';

	import InspectEditorVideo from '@/components/InspectEditorVideo.vue';

	import {
		usePublish,
		useSubscribe
	} from '@/hooks/EventEmitter';

	const _reatcive = reactive({
		data: {
			teleportTarget: 'body' as string | HTMLElement,
			videoBoxComp: undefined as undefined | Component
		},
		state: {
			video: false,
			report: false
		}
	});

	const videoBoxCompClassNameMapper = new Map<string, string>([
		['small', '#body'],
		['middle', '#body > #left'],
	])

	useChangeModle('small');

	const boxClassNameSetter = computed(() => {
		if(videoBox.value.type === 'small')
			return 'is-small'
		if(videoBox.value.type === 'middle')
			return 'is-middle'
		return '';
	});

	const openReportHandler = () => {
		useChangeModle('close');
		_reatcive.state.report = true;
	};

	onMounted(() => {
		_reatcive.data.videoBoxComp = videoBox.value.target;
		const cssSelectVar = videoBoxCompClassNameMapper.get(videoBox.value.type);
		if(!cssSelectVar) return;

		Hunter(() => document.querySelector(`.video-target > ${cssSelectVar}`), {
			cycle: 10,
			frequency: 100,
		}).then(el  => {
			_reatcive.data.teleportTarget = el as HTMLElement;
			_reatcive.state.video = true;
		});
	});

	watch(videoBox, (ctx) => {
		_reatcive.state.video = false;
		_reatcive.data.teleportTarget = 'body';
		_reatcive.data.videoBoxComp = ctx.target;
		nextTick(() => {
			const cssSelectVar = videoBoxCompClassNameMapper.get(ctx.type);
			if(!cssSelectVar) return;
					
			Hunter(() => document.querySelector(`.video-target > ${cssSelectVar}`), {
				cycle: 10,
				frequency: 100,
			}).then(el  => {
				_reatcive.data.teleportTarget = el as HTMLElement;
				_reatcive.state.video = true;
			})
		});
	})









	usePublish('AppFooterState', false);
	Hunter(() => ctid13511_isSet, {
		cycle: 25,
		frequency: 20,
		timing(target) {
			if(target.value === true) return true;
			return false;
		}
	}).then(() => {
		usePublish('setIframerMsg', {
			ctid: 12611,
			taskid: "1"
		});
		ctid13511_isSet.value = false;
	}).catch(e => console.log(e))
</script>