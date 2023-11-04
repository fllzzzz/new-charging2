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

type VideoBox = {
	type :'small' | 'middle' | 'full' | 'small-ext' | 'close';
	target :Component | undefined;
}

export const videoBox = ref<VideoBox>({
	type: 'small',
	target: MonitorVideoBoxSmall
});

const compMapper = new Map<string, Component>([
	['small', MonitorVideoBoxSmall],
	['middle', MonitorVideoBoxMiddle],
	['full', MonitorVideoBoxFull],
	['small-ext', MonitorVideoBoxSmallExt]
]);

export const useChangeModle = (
	model :'small' | 'middle' | 'full' | 'small-ext' | 'close'
	
) => videoBox.value = {
	type: model,
	target: compMapper.get(model)
};