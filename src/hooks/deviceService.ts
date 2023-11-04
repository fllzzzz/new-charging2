import {
	DeviceInfo
} from '@/types';

type DeviceContext = DeviceInfo & {
	id :number;
	name :string;
	state :number;
};

const Pool = new Map<string, any>();

export const useOnlineFilter = (
	list :DeviceContext[]
) => {
	Pool.set('onlineList', list.filter(device => device.state === 1));
};

export const usePoolGetter = <T>(
	name :string
) => Pool.get(name) as T;