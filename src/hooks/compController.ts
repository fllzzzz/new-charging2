import Hunter from '@/utils/Hunter';

import type{
	RouteLocationNormalized
} from 'vue-router';

type routeCtx = {
	type :'name' | 'path',
	model :'include' | 'exclude',
	locationList :string[];
};

import {
	ref
} from 'vue';

export const compStateInvoke = ref<Map<string, boolean>>(new Map());

const compRouteGroupInvoke = new Map<string, routeCtx[]>([
	['AppHeader', [
		{
			type: 'name',
			model: 'exclude',
			locationList: []
		}
	]],
	['AppHeaderLevel2', [
		{
			type: 'name',
			model: 'include',
			locationList: [
				'overview',
				'fusion-replay',
				'senseless-tracking',
				'video-tracking',
			]
		}
	]],
	['AppFooter', [
		{
			type: 'name',
			model: 'include',
			locationList: [
				'map',
				'overview',
				'fusion-replay',
				'senseless-tracking',
				'video-tracking',
				'monitor',
				'immediate-controller',
				'scene-controller',
			]
		}
	]],
	['AppSmartGuard', [
		{
			type: 'name',
			model: 'include',
			locationList: [
				'map',
				'overview',
				'monitor',
			]
		}
	]]
]);

export const compList = new Set<string>(
	compRouteGroupInvoke.keys()
);

export const useCompStateWatcher = (() => {
	let _route :RouteLocationNormalized;

	function handler(ctx :routeCtx) :boolean{
		if(ctx.type === 'name') {
			if(! _route[ctx.type]) return false;
			return isExist(ctx, ctx.type);
		}else if(ctx.type === 'path') {
			if(! _route[ctx.type]) return false;
			return isExist(ctx, ctx.type);
		}

		return false;
	}

	function isExist(
		ctx :routeCtx,
		type :'name' | 'path',
	) :boolean{
		let result :boolean;

		if(ctx.model === 'exclude') {
			result = ! ctx.locationList.includes(
				(_route[type]!).toString()
			);
			return result;
		}else if(ctx.model === 'include') {
			result = ctx.locationList.includes(
				(_route[type]!).toString()
			);
			return result;
		}

		return false;
	}

	return (route :RouteLocationNormalized) => {
		_route = route;
		for (const item of compRouteGroupInvoke) {
			for(let i=0; i < item[1].length; i++) {
				compStateInvoke.value.set(
					item[0], handler(item[1][i])
				)
			}
		}
	}
})();

export const useCompStateChanger = (
	name :string,
	state :boolean
) => {
	Hunter<typeof compStateInvoke>(() => compStateInvoke, {
		cycle: 10,
		frequency: 10,
		timing(target) {
			if(target.value.get(name) !== state) return true;
			return false;
		},
	}).then(data => {
		data.value.set(name, state);
	}).catch(err => {
		console.log(err);
	})
};