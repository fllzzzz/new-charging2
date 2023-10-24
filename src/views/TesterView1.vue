<style lang="scss" scoped>
	.container {
		display: flex;
		justify-content: space-between;
	}
</style>

<template>
	<div class="container">
		<InspectReportVideo></InspectReportVideo>
		<InspectReportDigital></InspectReportDigital>
		<InspectAlarmChech></InspectAlarmChech>
	</div>
</template>

<script setup lang="ts">
	import InspectAlarmChech from '@/components/InspectAlarmChech.vue';
	import InspectReportDigital from '@/components/InspectReportDigital.vue';
	import InspectReportVideo from '@/components/InspectReportVideo.vue';
</script>