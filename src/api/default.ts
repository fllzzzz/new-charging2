import axios from "axios";

import {
	ref
} from 'vue';

import type {
	DeviceInfo
} from '@/types';

type InspectHistory = {
	reportID :number;
	reportTime :string;
	reportContent :string[];
	type :string;
	result :number[];
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

type InspectVideoReport = {
	cameraList :DeviceInfo[];
	picList :string[];
	unnormalReportContent: string[][];
	[key :string] :any;
};



export const tokenStorage = ref<string | undefined>(undefined);

enum directions {
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
	baseURL: 'http://192.168.1.114:19028/EZvis',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});

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
			quality: 2,
			...deviceInfo
		},
	}).then(res => res.data)
	.then(result => JSON.parse(result.Data))
	.then(result => result.data.url);
}

export const getInspectHistoryList = (
	stationId :number
) => {
	return $default({
		method: 'post',
		url: '/report_list/GetReportList',
		data: {
			'station_id': stationId
		}
	})
	.then(res => res.data)
	.then(result => result.data as any[])
	.then(list => {
		return list.map(item => {
			return pullFormat<InspectHistory>(item)
		});
	});
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