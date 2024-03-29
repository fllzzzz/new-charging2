import axios from "axios";

import {
	ref
} from 'vue';

import type {
	DeviceInfo
} from '@/types';


interface Result<T> {
	Status? :boolean;
	Code? :number;
	message? :string;
	data? :T
};

interface Wrather {
	description :string;
	temp :number;
	humidity :number;
	windSpeed :number;
	rain :number;
};

type InspectHistory = {
	reportID :number;
	reportTime :string;
	reportContent :string[];
	type :string;
	result :number[];
};

type InspectAlarm = {
	stationID :number;
	alarmID :number;
	alarmContent :string[];
	device :DeviceInfo;
	time :string;
	type :string[];
	status :string;
};

type StationInfo = {
	id :number;
	stationID :number;
	districtID :number;
	longitude :number;
	latitude :number;
	stationName :string;
	stationFullName :string;
	[key :string] :any;
};

export type InspectVideoReport = {
	cameraList :DeviceInfo[];
	picList :string[];
	unnormalReportContent: string[][];
	[key :string] :any;
};

export const tokenStorage = ref<string | undefined>(undefined);

enum Directions {
	'up' = 0,
	'right' = 3,
	'down' = 1,
	'left' = 2,
	'right-up' = 6,
	'right-down' = 7,
	'left-down' = 5,
	'left-up' = 4,
	'enlarge' = 8,
	'narrow' = 9,
}

const $default = axios.create({
	timeout: 10000,
	baseURL: 'http://192.168.1.95:16900/api',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});

const $Ezvis = axios.create({
	timeout: 10000,
	baseURL: 'http://192.168.1.95:19010/EZvis',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});

const firstLetterToUpperCase = (str :string) => {
	const firstLetter = str[0];
	const _str = str.slice(1,str.length);
	return firstLetter.toLocaleUpperCase().concat(_str);
};

const pullFormat = <T=any>(data :object) => {
	const objArr = Object.entries(data);
	objArr.forEach(row => {
		if(
			typeof row[1] === 'string' &&
			row[1].search(/(^\[.*\]$)|(^\{.*\}$)/) === 0
			
		) {
			row[1] = JSON.parse(row[1]);
		}
	});
	return Object.fromEntries(objArr) as T;
};

const pushFormat = (
	data :any
) => {
	const _u = Object.entries(data);
	_u.forEach(row => {
		if(typeof row[1] === 'object' &&
			row[1] !== null
		) {
			row[1] = JSON.stringify(row[1]);
		}
	});
	return Object.fromEntries(_u);
};

export const getToken = async () => {
	return await $default({
		method: 'post',
		url: '/user/StationLogin',
		data: JSON.stringify({
			userName: "admin",
			password: "123456"
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.data)
	.then(result => result.data.token)
};

export const getDeviceList = async (StationID :number) => {
	return await $default({
		method: 'post',
		url: '/camera_list/GetCameraList',
		data: {
			'station_id': StationID,
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}).then(res => res.data)
	.then(result => result.data)
};

export const getVideoAddress = async (
	deviceInfo :DeviceInfo
) :Promise<string> => {
	return await $Ezvis({
		method: 'post',
		data: {
			Act: 'GetCamera_Adress',
			protocol: 4,
			quality: 1,
			...deviceInfo
		},
	}).then(res => res.data)
	.then(result => JSON.parse(result.Data))
	.then(result => result.data.url);
}

export const getDeviceCapture = async (
	deviceInfo :DeviceInfo
) :Promise<string> => {
	return await $Ezvis({
		method: 'post',
		data: {
			Act: 'DeviceCapture',
			...deviceInfo
		},
		timeout: 3000,
	}).then(res => res.data)
	.then(result => result.Data)
	.catch(() => '');
}

export const getInspectHistoryList = (
	stationId :number,
	pageId :number,
	timeRange? :string[]
) => {
	return $default({
		method: 'post',
		url: '/report_list/GetReportList',
		data: {
			'station_id': stationId,
			page: pageId,
			start: timeRange ? timeRange[0] : '',
			end: timeRange ? timeRange[1] : '',
		}
	})
	.then(res => res.data)
	.then(result => result.data as any[])
	.then(list => {
		if(! list) return [];
		return list.map(item => {
			return pullFormat<InspectHistory>(item)
		});
	})
};

export const getInspectAlarmList = (
	stationId :number,
	pageId :number,
	timeRange? :string[]
) => {
	return $default({
		method: 'post',
		url: '/alarm_list/GetAlarmList',
		data: {
			'station_id': stationId,
			page: pageId,
			start: timeRange ? timeRange[0] : '',
			end: timeRange ? timeRange[1] : '',
		}
	})
	.then(res => res.data)
	.then(result => result.data as any[])
	.then(list => {
		if(! list) return [];
		return list.map(item => {
			return pullFormat<InspectAlarm>(item)
		});
	})
};

export const getStationInfo = (
	stationId :number
) => {
	return $default({
		method: 'post',
		url: '/station_info/GetStationInfo',
		data: {
			'station_id': stationId
		}
	})
	.then(res => res.data)
	.then(result => result.data as any[])
	.then(list => {
		return list.map(item => {
			return pullFormat<StationInfo>(item)
		});
	});
};

export const getInspectVideoReport = (
	reportId :number
) => {
	return $default({
		method: 'post',
		url: '/report_list/GetReportPic',
		data: {
			'report_id': reportId
		}
	})
	.then(res => res.data)
	.then(result => result.data as any[])
	.then(list => {
		return list.map(item => {
			return pullFormat<InspectVideoReport>(item)
		});
	})
	.then(inspectVideoReportList => inspectVideoReportList[0])
};

export const setInspectHistory = (
	data :any
) => {
	const _u = Object.entries(data);
	for(let i=0; i<_u.length; i++) {
		_u[i][0] = firstLetterToUpperCase(_u[i][0]);
	}

	data = Object.fromEntries(_u);
	data = pushFormat(data);

	return $default({
		method: 'post',
		url: '/report_list/Add',
		data: JSON.stringify({
			mainData: {...data},
			detailData: null,
			delKeys: null
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + tokenStorage.value
		}
	}).then(result => console.log(result))
};

export const setInspectAlarm = (
	data :any
) => {
	const _u = Object.entries(data);
	for(let i=0; i<_u.length; i++) {
		_u[i][0] = firstLetterToUpperCase(_u[i][0]);
	}

	data = Object.fromEntries(_u);
	data = pushFormat(data);

	return $default({
		method: 'post',
		url: '/alarm_list/Add',
		data: JSON.stringify({
			mainData: {...data},
			detailData: null,
			delKeys: null
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + tokenStorage.value
		}
	}).then(result => console.log(result))
};

export const updateInspectHistory = (
	data :any
) => {
	const _u = Object.entries(data);
	for(let i=0; i<_u.length; i++) {
		_u[i][0] = firstLetterToUpperCase(_u[i][0]);
	}

	data = Object.fromEntries(_u);
	data = pushFormat(data);

	return $default({
		method: 'post',
		url: '/report_list/Update',
		data: JSON.stringify({
			mainData: {...data},
			detailData: null,
			delKeys: null
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + tokenStorage.value
		}
	}).then(result => console.log(result))
};

export const getInspectTotalNum = (
	model :'history' | 'alarm'
) => {
	if(model === 'history')
		return $default({
			method: 'post',
			url: '/report_list/GetCount',
		})
		.then(res => res.data)
		.then(result => (result.data as number));
	if(model === 'alarm')
		return $default({
			method: 'post',
			url: '/alarm_list/GetCount',
		})
		.then(res => res.data)
		.then(result => (result.data as number));
};

export const getAlarmReportImage = (
	id: number
) => {
	return $default({
		method: 'post',
		url: '/alarm_list/GetAlarmPic',
		data: {
			'alarm_id': id
		},
		timeout: 3000
	})
	.then(res => res.data)
	.then(result => result.data as any[])
	.then(data => data[0].image as string)
};

export const getDeviceName = (
	params : DeviceInfo & {
		stationId :number;
	}
) => {
	return $default({
		method: 'post',
		url: '/camera_list/GetCameraName',
		data: {
			'station_id': params.stationId,
			deviceSerial: params.deviceSerial,
			channelNo: params.channelNo
		},
		timeout: 3000
	})
	.then(res => res.data)
	.then(result => result.data)
	.then(data => data.cameraName as string)
};

export const updateAlarmStatus = (
	id :number,
	status :string,
) => {
	return $default({
		method: 'post',
		url: '/alarm_list/update',
		data: {
			mainData: {
				AlarmID: id,
				Status: status
			},
			UpdateContent: "更新处理状态",
			detailData: null,
			delKey: null
		},
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + tokenStorage.value
		},
		timeout: 3000
	});
};

export type Direction = keyof typeof Directions;
export const cloudController = async (
	deviceInfo :DeviceInfo,
	direction :keyof typeof Directions,
) :Promise<void> => {
	$Ezvis({
		method: 'post',
		data: {
			Act: 'ControlCamera_Move_Start',
			...deviceInfo,
			direction: Directions[direction],
			speed: 1,
		},
	}).then(() => {
		setTimeout(() => {
			$Ezvis({
				method: 'post',
				data: {
					Act: 'ControlCamera_Move_Stop',
					...deviceInfo,
					speed: 1,
				},
			})
		}, 1000)
	})
}
export const getWeather = async (
	stationId :number
) => {
	const areaId = await getStationInfo(stationId).then(
		result => result[0].districtID
	);

	return await $default<Result<Wrather[]>>({
		method: 'post',
		url: '/weather_system/GetWeatherData',
		data: {
			'Area_id': areaId
		}
	})
	.then(res => res.data.data)
	.then(data => {
		if(! data) return undefined;
	
		const keys = [
			'description',
			'temp',
			'humidity',
			'windSpeed',
			'rain',
		];
		
		return Object.fromEntries(Object.entries(data[0]).filter(
			row => keys.includes(row[0]) ? true : false
		)) as Wrather;
	})
}