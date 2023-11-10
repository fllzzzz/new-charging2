<style lang="scss" scoped>
	:deep(.el-pagination) {
		--el-pagination-hover-color: none;
		.el-pagination__total {
			font-size: 14px;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FEFEFE;
		}
		button.btn-prev,
		button.btn-next {
			width: 54px;
			height: 28px;
			background: transparent !important;
			border: 1px solid #2E696F;
			border-radius: 2px;
			font-size: 14px;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FEFEFE;
			&[aria-disabled=true] {
				opacity: 0.3;
			}
		}
		button.btn-prev {
			margin-left: 12px;
			margin-right: 16px;
		}
		button.btn-next {
			margin-left: 16px;
		}
		li.number,
		li.more {
			font-size: 14px;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FEFEFE;
			width: 24px;
			height: 28px;
			background: transparent;
			border: 1px solid #2E696F;
			border-radius: 2px;
			margin-right: 8px;
			margin-left: 0;
			&:last-child {
				margin-right: 0;
			}
			&.is-active {
				background-color: #2E696FFF;
			}
		}
		.el-pagination__jump {
			span {
				font-size: 14px;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FEFEFE;
			}
			.el-input {
				width: 60px;
				height: 28px;
				border: 1px solid #2E696F;
				border-radius: 2px;
				margin-left: 7px;
				margin-right: 8px;
				.el-input__wrapper {
					background: transparent;
					box-shadow: none;
					.el-input__inner {
						font-size: 14px;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FEFEFE;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="pagination-container">
		<el-pagination
			background
			layout="total, prev, pager, next, jumper"
			:total="_reatcive.data.totle"
			:page-count="_reatcive.data.pageCount"
			:pager-count="_reatcive.data.pagerCount"
			prev-text="上一页"
			next-text="下一页"
			@current-change="pageChanger"
		>
		</el-pagination>
	</div>
</template>

<script setup lang="ts">
	import {
		getInspectTotalNum
	} from '@/api/default';

	import {
		reactive,
		onMounted
	} from 'vue';

	const emits = defineEmits([
		'page-change'
	]);

	const _reatcive = reactive({
		data: {
			totle: -1,
			pageCount: -1,
			pagerCount: 5
		}
	});

	getInspectTotalNum('history').then(result => {
		_reatcive.data.totle = result;
		_reatcive.data.pageCount = result / 15 ;
	})

	const pageChanger = (index :number) => {
		emits('page-change', index);
	}
</script>