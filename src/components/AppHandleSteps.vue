<style lang="scss" scoped>
	.handle-steps-container {
		width: 100%;
	}

	.el-steps {
		width: 100%;
		#icon{
			width: 20px;
			height: 20px;
			background: #1D9DFF;
			border-radius: 4px;
			display: flex;
			justify-content: center;
			align-items: center;
			span {
				font-size: 14px;
				font-family: DINPro;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
		#title {
			span {
				font-size: 16px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
		#description {
			display: flex;
			flex-flow: column nowrap;
			span {
				&.text {
					font-size: 16px;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
				}
				&.time {
					font-size: 16px;
					font-family: DINPro;
					font-weight: 400;
					color: #9EFF00;
				}
			}
		}
	}
	:deep(.el-step__icon) {
			background-color: transparent;
		}
	:deep(.el-step__line) {
		width: 3px;
		background: #00FFFF;
		opacity: 0.2;
	}
	:deep(.el-step) {
		width: 100% !important;
		.el-step__description {
			padding-right: unset;
		}
	}
</style>

<template>
	<div class="handle-steps-container">
		<el-steps
			direction="vertical"
			:space="125"
		>
			<template
				v-for="step in _reactive.data.stepList"
				:key="step.id"
			>
				<el-step
				>
					<template #icon>
						<div id="icon">
							<span>{{ step.id }}</span>
						</div>
					</template>
					<template #title>
						<div id="title">
							<span id="title">{{ step.title }}</span>
						</div>
					</template>
					<template #description>
						<div id="description">
							<template
								v-for="ctx, index in step.descriptionList"
								:key="index"
							>
								<template
									v-if="typeof ctx.content === 'object'"
								>
									<template
										v-for="text, index in ctx.content"
										:key="index"
									>
										<span
											:class="ctx.type"
										>{{ text }}</span>
									</template>
								</template>
								<template v-else>
									<span
										:class="ctx.type"
									>{{ ctx.content }}</span>
								</template>
							</template>
						</div>
					</template>
				</el-step>
			</template>
		</el-steps>
	</div>
</template>

<script setup lang="ts">
	import {
		reactive
	} from 'vue';

	const _reactive = reactive({
		data: {
			stepList: [
				{
					id: 1,
					title: 'default title1',
					descriptionList: [
						{
							type: 'text',
							content: ['刘某某，18765432110'] as string[]
						},
						{
							type: 'time',
							content: new Date().toLocaleString()
						}
					]
				},
				{
					id: 2,
					title: 'default title2',
					descriptionList: [
						{
							type: 'time',
							content: new Date().toLocaleString()
						}
					]
				},
				{
					id: 3,
					title: 'default title3',
					descriptionList: [
						{
							type: 'time',
							content: new Date().toLocaleString()
						}
					]
				},
				{
					id: 1,
					title: 'default title1',
					descriptionList: [
						{
							type: 'text',
							content: ['刘某某，18765432110'] as string[]
						},
						{
							type: 'time',
							content: new Date().toLocaleString()
						}
					]
				},
				{
					id: 2,
					title: 'default title2',
					descriptionList: [
						{
							type: 'time',
							content: new Date().toLocaleString()
						}
					]
				},
				{
					id: 3,
					title: 'default title3',
					descriptionList: [
						{
							type: 'time',
							content: new Date().toLocaleString()
						}
					]
				},
			]
		}
	});
</script>