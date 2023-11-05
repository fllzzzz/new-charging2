import 'video.js/dist/video-js.css';

import videojs from "video.js";
import Player from 'video.js/dist/types/player';
import 'videojs-flvjs-es6';

import { ElLoading } from 'element-plus'
import 'element-plus/dist/index.css';

import Hunter from '@/utils/Hunter';

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
	children? :string[];
	userActions? :UserActions;
	flvjs? :FlvjsOption;
};

type FlvjsOption = {
	mediaDataSource :{
		isLive :boolean;
		cors :boolean;
		withCredentials :boolean;
	};
}

type UserActions = {
	doubleClick :boolean;
};

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
	options? :Option,
	fn? :((player :Player) => void)
) => {
	const player = videojs.getPlayer(id);
	if(player) return player;

	return await _getEl(id).then(el => {
		return videojs(
			el,
			videojs.mergeOptions(
				_options, options
			),
			function(this :Player) {
				this.addClass('video-js');
				(this.el_ as HTMLElement).style.backgroundColor = 'transparent';

/* 				this.on('loadstart', () => {
					data.elLoadingInstance = ElLoading.service({
						target: this.el_ as HTMLElement,
						fullscreen: false,
						background: 'transparent',
						customClass: 'el-loading-container'
					})
				});

				this.on('loadedmetadata', () => {
					if(data.elLoadingInstance) {
						data.elLoadingInstance.close()
					}
				}); */

				data.elLoadingInstance = ElLoading.service({
					target: this.el_ as HTMLElement,
					fullscreen: false,
					background: 'transparent',
					customClass: 'el-loading-container disable_pointer-event'
				})

				fn && fn(this);
			}
		)
	})
};