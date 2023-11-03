import axios from "axios";

import {
	ref
} from 'vue';

import type {
	DeviceInfo
} from '@/types';

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
		'Content-Type': 'application/json'
	}
});

const $Ezvis = axios.create({
	timeout: 10000,
	baseURL: 'http://192.168.1.114:19028/EZvis',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});

export const getToken = async () => {
	return await $default({
		method: 'post',
		url: '/user/StationLogin',
		data: JSON.stringify({
			userName: "admin",
			password: "123456"
		})
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
) => {
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