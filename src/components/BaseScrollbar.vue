<style lang="scss">
	.el-scrollbar {
		& > div:nth-of-type(3) {
			width: 6px;
			.el-scrollbar__thumb {
				width: 100%;
				background-color: rgba(17, 230, 240, 1);
			}
		}
	}
</style>

<template>
	<el-scrollbar
		:noresize="true"
	>
		<template #default>
			<slot name="context"></slot>
		</template>
	</el-scrollbar>
</template>

<script setup lang="ts">
</script>