import MonitorVideoBoxFull from '@/components/MonitorVideoBoxFull.vue';
import MonitorVideoBoxMiddle from '@/components/MonitorVideoBoxMiddle.vue';
import MonitorVideoBoxSmallExt from '@/components/MonitorVideoBoxSmallExt.vue';
import MonitorVideoBoxSmall from '@/components/MonitorVideoBoxSmall.vue';

import type {
	Component
} from 'vue';

import {
	ref
} from 'vue';

export const videoBoxModel = ref<Component | undefined>(undefined);

const compMapper = new Map<string, Component>([
	['small', MonitorVideoBoxSmall],
	['middle', MonitorVideoBoxMiddle],
	['full', MonitorVideoBoxFull],
	['small-ext', MonitorVideoBoxSmallExt]
]);
export const useChangeModle = (
	model :'small' | 'middle' | 'full' | 'small-ext'
) => videoBoxModel.value = compMapper.get(model);