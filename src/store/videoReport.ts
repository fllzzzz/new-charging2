import type {
	DeviceInfo
} from '@/types';

type Report = {
	id :number
	deviceInfo :DeviceInfo,
	keyWord :string[];
	title :string,
	image :string;
};

type Context = {
	device :DeviceInfo,
	keyWords :string[]
};


export const useReportUpdater = (() => {
	let _fnList :((
		ctx :Context
	) => void);

	return (
		fn? :((
			ctx :Context
		) => void),
		ctx? :Context
	) => {
		if(fn) _fnList = fn;
		if(! ctx) return;
		_fnList(ctx);
	};
})();

export const useReportMaker = (() => {
	let _fnList :((
		ctx :Report[]
	) => void);

	let _ctx :Report[];

	return (
		fn? :((
			ctx :Report[]
		) => void),
		ctx? :Report[]
	) => {
		if(fn) _fnList = fn;
		if(ctx) _ctx = ctx;
		
		if(_fnList && _ctx) _fnList(_ctx);
	};
})();