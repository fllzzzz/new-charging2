import Hunter from '@/utils/Hunter';

import type{
	RouteLocationRaw,
	RouteLocationNormalized
} from 'vue-router';

import {
	ref,
	watch,
} from 'vue';

type AnchorPointContext = {
	type :'name' | 'path',
	location :string;
}

const _from = ref<RouteLocationNormalized | undefined>(undefined);
const _to = ref<RouteLocationNormalized | undefined>(undefined);
const anchorPointMapper = new Map<string, AnchorPointContext>();


export const useRouteHighLight = (() => {
	type Target = {
		state :number;
		name :string;
		imageList :string[];
		[key :string] :any;
	}
	
	const _data = new Map<string, Target[]>();
	let _fn :((ctx :Target[]) => void);

	watch(_to, (to) => {
		Hunter<typeof _data>(() => _data, {
			cycle: 5,
			frequency: 10,
			timing(target) {
				return target.size > 0;
			}
		}).then(data => {
/* 			data.forEach(targetList => {
				const oldTarget = targetList.find(
					item => item.state === 1
				);
				if(oldTarget) {
					[oldTarget.imageList[0], oldTarget.imageList[1]] =
						[oldTarget.imageList[1], oldTarget.imageList[0]];
					oldTarget.state = 0;
				}
	
				const target = targetList.find(
					item => item.name === to?.name
				);
				if(!target) return;
				[target.imageList[0], target.imageList[1]] =
					[target.imageList[1], target.imageList[0]];
				target.state = 1;
				console.log('callback', targetList);
			}); */

			for(const i of data) {
				const oldTarget = i[1].find(
					item => item.state === 1
				);
				if(oldTarget) {
					[oldTarget.imageList[0], oldTarget.imageList[1]] =
						[oldTarget.imageList[1], oldTarget.imageList[0]];
					oldTarget.state = 0;
				}
				const target = i[1].find(
					item => item.name === to?.name
				);
				if(!target) {
					_fn(i[1]);
					return;
				}
				[target.imageList[0], target.imageList[1]] =
					[target.imageList[1], target.imageList[0]];
				target.state = 1;
				_fn(i[1]);
			}
		
/* 			setTimeout(() => {
				for(const i of data) {
					const oldTarget = i[1].find(
						item => item.state === 1
					);
					if(oldTarget) {
						[oldTarget.imageList[0], oldTarget.imageList[1]] =
							[oldTarget.imageList[1], oldTarget.imageList[0]];
						oldTarget.state = 0;
					}
					const target = i[1].find(
						item => item.name === to?.name
					);
					if(!target) {
						_data.set(i[0], i[1]);
						return;
					}
					[target.imageList[0], target.imageList[1]] =
						[target.imageList[1], target.imageList[0]];
					target.state = 1;
	
					_data.set(i[0], i[1]);
					console.log(i[1],_data);
				}
			},1000) */
		}).catch(err => {
			console.log(err);
		})
	},{
		flush: 'post'
	});

	return (
		name :string,
		targetList :Target[],
		fn :((ctx :Target[]) => void)
	) => {
		/* if(_data.get(name)) return; */
		_fn = fn;
		_data.set(name, targetList);
	};
})();

export const useAnchorPointSetter = (
	fn :((
		from? :RouteLocationNormalized,
		to? :RouteLocationNormalized
	) => [string, AnchorPointContext] | undefined)
) => {
	if(!_from.value || !_to.value) return;
	const _arr = fn(_from.value, _to.value);
	if(! _arr) return;
	anchorPointMapper.set(_arr![0], _arr![1]);
};

export const useAnchorPointGetter = (
	anchorPointName :string
) => {
	let _obj :RouteLocationRaw;
	const anchorPoint = anchorPointMapper.get(anchorPointName);
	
	if(!anchorPoint) return;
	
	if(anchorPoint.type === 'name') {
		_obj = {
			name: anchorPoint.location
		}
	}else if(anchorPoint.type === 'path') {
		_obj = {
			path: anchorPoint.location as string
		}
	}else {
		_obj = {};
	}

	return _obj;
};

export const useSaveRouter = (
	from: RouteLocationNormalized,
	to: RouteLocationNormalized
) => {
	_from.value = from;
	_to.value = to;
};