<style lang="scss" scoped>
	.deviceList-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		pointer-events: none;
		box-sizing: border-box;
		& > .item {
			width: 100%;
			pointer-events: auto;
			box-sizing: border-box;
		}
		& > .item:nth-of-type(1) {
			height: 34px;
			margin-bottom: 16px;
		}
		& > .item:nth-of-type(2) {
			flex: 1;
			overflow: hidden;
		}
	}

	:deep(.el-input) {
		width: 100%;
		height: 100%;
		.el-input__wrapper {
			padding: 10px 18px 8px 18px;
			box-shadow: none;
			background-color: transparent;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('@/assets/images/background/search.png');
			.el-input__inner {
				font-size: 16px;
				font-family: PingFangSC;
				font-weight: 400;
				color: #A0DCDA;
				&::placeholder {
					font-size: 16px;
					font-family: PingFangSC;
					font-weight: 400;
					color: #A0DCDA;
				}
			}
			.el-input__suffix {
				position: absolute;
				right: 10px;
			}
		}
	}
	.el-input-slot {
		&#suffix {
			width: 18px;
			height: 18px;
			margin: 0;
			object-fit: fill;
		}
	}
	.device {
		width: 99%;
		height: 30px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		& > * {
			pointer-events: none;
		}
		img {
			margin-right: 10px;
			width: 24px;height: 24px;
			object-fit: fill;
		}
		span {
			font-size: 16px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #DBFFFE;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	:deep(.is-active) {
		background: linear-gradient(90deg, rgba(0, 255, 246, 0.5) 0%, transparent 100%);
	}

	:deep(.is-locked) {
		&:hover {
			cursor:not-allowed;
		}
	}
</style>

<template>
	<div class="deviceList-container">
		<div class="item">
			<el-input
				placeholder="请输入名称搜索"
				v-model="_reactive.data.searchInput"
			>
				<template #suffix>
					<img class="el-input-slot"
						id="suffix"
						src="@/assets/images/icon/search.png">
				</template>
			</el-input>
		</div>
		<div class="item">
			<el-scrollbar>
				<template #default>
					<template
						v-for="(device,index) in _reactive.data.deviceList"
						:key="index"
					>
						<div class="device"
							@click="deviceListClickHandler(
								$event, device
							)"
							:class="getLockState(device.state)"
						>
							<template
								v-if="device.state === 0"
							>
								<img :src="_reactive.data.imgList[1]">
							</template>
							<template v-else>
								<img :src="_reactive.data.imgList[0]">
							</template>
							<span>{{ device.name }}</span>
						</div>
					</template>
				</template>
			</el-scrollbar>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		useOnlineFilter
	} from '@/hooks/deviceService';

	import {
		usePublish
	} from '@/hooks/EventEmitter';

	import {
		DeviceInfo
	} from '@/types';

	import {
		getDeviceList
	} from '@/api/default';

	import {
		reactive,
		computed,
PropType,ref, watchEffect
	} from 'vue';

	interface Config {
		defaultIndex :number;
	};

	const emits = defineEmits(['select']);

	const props = defineProps({
		config: {
			type: Object as PropType<Config>
		}
	});

	const config = ref<Config | undefined>();

	watchEffect(() => {
		config.value = props.config;

		if(config.value?.defaultIndex) {
			
		}
	});

	const _reactive = reactive({
		data: {
			searchInput: undefined as undefined | string,
			imgList: [
				require<string>('@/assets/images/icon/monitor-2_online.png'),
				require<string>('@/assets/images/icon/monitor-2_offline.png'),
			],
			deviceList: [] as any[]
		}
	});



	const deviceListClickHandler = (() => {
		let _oldTarget :HTMLElement;

		type DeviceInfos = DeviceInfo & {
			state :number,
			name :string;
		}

		function heightLight(el :HTMLElement) {
			if(_oldTarget) _oldTarget.classList.remove('is-active');

			el.classList.add('is-active');
			_oldTarget = el;
		}

		function deviceInfoSync(device :DeviceInfos) {
			usePublish('setIframerMsg', {
				ctid: 14111,
				deviceSerial: device.deviceSerial,
				channelNo: device.channelNo
			});

			emits('select', {
				deviceSerial: device.deviceSerial,
				channelNo: device.channelNo
			} as DeviceInfo)
		}

		function locker(state :number, event :MouseEvent) {
			if(state === 0) {
				event.preventDefault();
				return true;
			}
			return false;
		}

		return (
			event :MouseEvent,
			deviceInfo :DeviceInfos
		) => {
			if(locker(deviceInfo.state, event)) return;
			heightLight((event.target as HTMLElement));
			deviceInfoSync(deviceInfo);
		}
	})();

	const getLockState = computed(() => (state :number) => {
		if(state === 0) return 'is-locked';
	});

	getDeviceList(16).then((deviceList :any[]) => {
		const _arr = deviceList.map(device => {
			return {
				id: device.id,
				name: device.cameraName,
				deviceSerial: device.deviceSerial,
				channelNo: device.channelNo,
				state: device.tisIOnline
			}
		});

		_reactive.data.deviceList = _arr;
		useOnlineFilter(_arr);
	});
</script>