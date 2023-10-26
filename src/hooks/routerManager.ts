import {
	RouteLocationNormalized
} from 'vue-router';

import {
	ref,
	watch
} from 'vue';
import Hunter from '@/utils/Hunter';


const _from = ref<RouteLocationNormalized | null>(null);
const _to = ref<RouteLocationNormalized | null>(null);

export const useRouteHighLight = (() => {
	type Target = {
		state :number;
		name :string;
		imageList :string[];
		[key :string] :any;
	}

	const _data :Target[][] = [];

	watch(_to, (to) => {
		Hunter<Target[][]>(() => _data, {
			cycle: 10,
			frequency: 10,
			timing(target) {
				return target.length > 0;
			}
		}).then(data => {
			data.forEach(targetList => {
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
			});
		}).catch(err => {
			console.log(err);
		})
	});

	return (
		targetList :Target[]
	) => {
		_data.push(targetList);
	};
})()

export const useSaveRouter = (
	from: RouteLocationNormalized,
	to: RouteLocationNormalized
) => {
	_from.value = from;
	_to.value = to;
};