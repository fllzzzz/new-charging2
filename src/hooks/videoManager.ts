import 'video.js/dist/video-js.css';

import videojs from "video.js";
import 'videojs-flvjs-es6';

import { ElLoading } from 'element-plus'
import 'element-plus/dist/index.css';

import {
	onMounted,
	nextTick
} from 'vue';

const data = {
	elLoadingInstance: null as any,
};

export type Option = {
	autoplay? :boolean | 'any';
	controls? :boolean;
	children? :string[]
	flvjs :FlvjsOption;
};

type FlvjsOption = {
	mediaDataSource :{
		isLive :boolean;
		cors :boolean;
		withCredentials :boolean;
	};
}

const _options :Option = {
	controls: true,
	children: ['MediaLoader'],
	flvjs: {
		mediaDataSource: {
			isLive: true,
			cors: true,
			withCredentials: false,
		}
	},
};

async function _getEl(
	id :string
) {
	return await Promise.any<Promise<HTMLElement>[]>([
		new Promise(resolve => {
			nextTick(() => {
				const el = document.getElementById(id);
				if(el) resolve(el);
			});
		}),
		new Promise(resolve => {
			onMounted(() => {
				const el = document.getElementById(id);
				if(el) resolve(el);
			});
		}),
	]);
}

export const usePlayerCreater = async (
	id: string,
	options? :Option
) => {
	const player = videojs.getPlayer(id);
	if(player) return player;

	return await _getEl(id).then(el => {
		return videojs(
			el,
			videojs.mergeOptions(
				_options, options
			),
			function(this :any) {
				this.addClass('video-js');
				(this.el_ as HTMLElement).style.backgroundColor = 'transparent';

				this.on('loadstart', () => {
					data.elLoadingInstance = ElLoading.service({
						target: this.el_,
						fullscreen: false,
						background: 'transparent'
					})
				});

				this.on('loadedmetadata', () => {
					if(data.elLoadingInstance) {
						data.elLoadingInstance.close()
					}
				});
			}
		)
	})
};