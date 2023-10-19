import type {
	RouteLocationNormalizedLoaded
} from 'vue-router';

type list = {
	name: string;
	state :number;
	imageList: string[];
	[key :string] :any;
}[];

export const useHeightLight = (() => {

	function routeManager(
		route :RouteLocationNormalizedLoaded,
		id :string,
	) {
		if(route.name === id) return true;
		return false;
	}

	function itemStateChanger(id :string, list :list) {
		const oldTarget = list.find(item => item.state === 1);
		if(oldTarget) {
			[oldTarget.imageList[0], oldTarget.imageList[1]] =
				[oldTarget.imageList[1], oldTarget.imageList[0]]
				oldTarget.state = 0;
		}

		const currentTarget = list.find(item => item.name === id);
		if(currentTarget) {
			[currentTarget.imageList[0], currentTarget.imageList[1]] =
				[currentTarget.imageList[1], currentTarget.imageList[0]]
				currentTarget.state = 1;
		}
	}

	return (
		event :MouseEvent,
		list :list,
		route? :RouteLocationNormalizedLoaded
	) => {
		const id = (event.target as HTMLElement).id;
		if(route) {
			if(routeManager(route, id)) {
				itemStateChanger(id, list)
			}
		}else {
			itemStateChanger(id, list)
		}
	};
})();