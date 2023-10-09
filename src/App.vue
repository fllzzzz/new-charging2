<style lang="scss">
	#app {
		width: 100vw;
		height: 100vh;
		user-select: none;
		background-color: black;
	}
</style>

<template>
	<RouterView v-slot="{Component, route}">
		<KeepAlive>
			<component :is="Component" v-if="route.meta.keepAlive"></component>
		</KeepAlive>
		<component :is="Component" v-if="! route.meta.keepAlive"></component>
	</RouterView>
</template>

<script setup lang="ts">

</script>