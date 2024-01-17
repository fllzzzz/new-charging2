import 'video.js/dist/video-js.css';

import videojs from "video.js";
import Player from 'video.js/dist/types/player';
import 'videojs-flvjs-es6';

import { ElLoading } from 'element-plus'
import 'element-plus/dist/index.css';

import {
	onMounted,
	nextTick
} from 'vue';


const u = videojs.getTech('Flvjs');



const playerLoadingMapper = new Map<string, any>();

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
	doubleClick? :boolean;
	click? :boolean;
};

const _options :Option = {
	controls: true,
	autoplay: 'any',
	userActions: {
		click: false
	},
	children: ['MediaLoader'],
	flvjs: {
		mediaDataSource: {
			isLive: false,
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

export const closeLoading = 
	() => playerLoadingMapper.forEach(instance => instance.close());

export const usePlayerCreater = async (
	id: string,
	options? :Option,
	fn? :((player :Player) => void)
) => {
	console.log('@video => create player');


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


				this.on('loadstart', () => {
					playerLoadingMapper.set(
						this.id_,
						ElLoading.service({
							target: this.el_ as HTMLElement,
							fullscreen: false,
							background: 'transparent',
							customClass: 'el-loading-container disable_pointer-event'
						})
					)
				});

				this.on('loadedmetadata', () => {
					const loadInstance = playerLoadingMapper.get(this.id_);
					if(! loadInstance) return;
					loadInstance.close();
				});

				fn && fn(this);
			}
		)
	})
};