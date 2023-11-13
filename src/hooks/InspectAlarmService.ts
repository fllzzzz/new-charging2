import {
	getInspectAlarmList,
	getAlarmReportImage
} from '@/api/default';

import {
	useAlarmTypeMaker,
	useInspectReportMaker
} from '@/hooks/InspectManager';

import { DeviceInfo } from "@/types";

type Data = {
	stationId :number;
	alarmID: number;
	time :string;
	alarmType :string[];
	alarmContent :string[];
	device :DeviceInfo;
	status :string;
	image :string;
};

type Storage = {
	alarmID: number;
	device :DeviceInfo,
	time :string,
	name :string,
	alarmList :string[],
};

type Push = {
	device :DeviceInfo;
	status :string;
	image :string;
	dataList :string[];
};

type Pull = {
	stationId :number;
	pageNum :number;
};

type Details = {
	device :DeviceInfo,
	time :string,
	name :string,
	alarmList :string[],
	image :string
};

export default class InspectAlarmService {
	protected storage :Storage[] = [];
	protected data :Data = {
		stationId: -1,
		alarmID: -1,
		time: '',
		alarmType: [],
		alarmContent: [],
		device: {
			deviceSerial: '',
			channelNo: -1
		},
		status: '',
		image: ''
	}

	constructor(
		params :Pick<Data, 'stationId' | 'alarmID'>
	) {
		this.data.stationId = params.stationId;
		this.data.alarmID = params.alarmID;
	}

	protected setTime () {
		this.data.time = new Date().toLocaleString();
	}

	protected async storager<T>(
		data :T,
		fn: ((data :T) => void)
	) {
		await fn(data);
	}

	push(
		params :Push
	) {
		this.setTime();
		this.data.device = params.device;
		this.data.status = params.status;
		this.data.image = params.image;
		this.data.alarmType = useAlarmTypeMaker(params.dataList);
		this.data.alarmContent =
			useInspectReportMaker(params.dataList)
			.filter(item => item.state === 1)
			.map(item => item.data);

	}

	async pull(
		params :Pull 
	) {
		const result = await getInspectAlarmList(
			params.stationId,
			params.pageNum
		);

		this.storager<typeof result>(result, (result) => {
			this.storage = result.map(item => {
				return {

				} as Storage
			})
		});

		return result;
	}

	async getDetails(
		id :number
	) {
		const image = await getAlarmReportImage(id);

		const target = this.storage.find(item => {
			if(item.alarmID === id) return true;
		});

		if(! target) return undefined;

		return {
			image,
			device: target.device,
			time: target.time,
			name: target.name,
			alarmList: target.alarmList,
		} as Details;
	}
}