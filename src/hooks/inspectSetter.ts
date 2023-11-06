import {
	DeviceInfo
} from '@/types';

type Store = {
	reportID :number;
	reportTime :string;
	reportContent :string[];
	type :string;
	result :number[];
	cameraList :DeviceInfo[];
	picList :string[];
	unnormalReportContent: string[][];
};

const s = new Proxy({} as Store, {});

export const storeSetter = (
	
) => {

};
