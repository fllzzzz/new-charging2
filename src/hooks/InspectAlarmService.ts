import {
	getInspectAlarmList,
	getAlarmReportImage,
	setInspectAlarm,
	getStationInfo,
	getDeviceName
} from '@/api/default';

import {
	useAlarmTypeMaker,
	useInspectReportMaker
} from '@/hooks/InspectManager';

import {
	DeviceInfo
} from "@/types";

type Inbound = {
	StationID :number;
    AlarmID :number;
	ReportID :number;
    Device :DeviceInfo
    Time :string;
    Type :string[];
    Status :string;
    AlarmContent :string[];
    Image :string;
};

type OutBound = {
	id :number;
	alarmId :number;
	stationName :string;
	alarmContent :string[];
	monitorName :string;
	alarmTime :string;
	alarmType :string[];
	handleStatus :string;
	options :string[];
	device :DeviceInfo
};

type Detail = {
	deviceInfo :DeviceInfo;
	time :string;
	name :string;
	alarmList :string[];
	image :string;
};

export default class InspectAlarmService {
	protected inbound :Inbound;
	protected static store :Map<string, any> = new Map();

	constructor(
		params :Pick<Inbound, 'StationID'>
	) {
		this.inbound = {
			StationID: params.StationID,
			AlarmID: -1,
			ReportID: -1,
			Device: {} as DeviceInfo,
			Time: '',
			Type: [],
			Status: '',
			AlarmContent: [],
			Image: ''
		};
	}

	public push(
		params :Omit<Inbound, 'StationID'>
	) :void {
		this.inbound = this.autoAssign(params) as Inbound;

		setInspectAlarm(this.inbound);
	}

	public async pull(
		pageNum :number
	) /* :Promise<OutBound[]> */ {
		const result = await Promise.allSettled([
			getInspectAlarmList(
				this.inbound.StationID, pageNum
			),
			getStationInfo(this.inbound.StationID)
		]).then( pending => {
			return pending.map(item => {
				if(item.status === 'rejected') return null;
				return item.value;
			})
		})
/* 		.then(dataList => {
			return dataList[0].map<OutBound>((item, index) => ({
				id: index + 1,
				stationName: dataList[1][0].stationName,
				alarmContent: dataList[0][index].alarmContent,
				monitorName: await getDeviceName({
					stationId: this.inbound.StationID,
					...item.
				}),
				alarmTime: dataList[0][index].time,
				alarmType: dataList[0][index].type,
				handleStatus: dataList[0][index].status,
				options: ['告警查看', '已处理', '处置报告'],
				alarmId: dataList[0][index].alarmID,
				device: dataList[0][index].device
			}));
		}); */

		this.stoarger<typeof result>(result, (result) => {
			return new Promise(() => {
				InspectAlarmService.store.set('outbound', result);
			})
		});

		/* return result; */
	}

	public async getDetails(
		id :number
	) :Promise<Detail | undefined> {
		const list :OutBound[] | undefined = InspectAlarmService.store.get('outbound');
		if(! list || (list && list.length === 0)) return;

		const target = list.find(item => {
			if(item.alarmId === id) return true;
		});	
		if(! target) return;

		return {
			deviceInfo: target.device,
			time: target.alarmTime,
			name: target.monitorName,
			alarmList: target.alarmContent,
			image: await getAlarmReportImage(id)
		} as Detail
	}

	protected autoAssign(
		target :any,
	) {
		const _u = Object.entries(this.inbound).map(item0 => {
			Object.entries(target).forEach(item1 => {
				if(item1[0] === item0[0]) {
					item0[1] = item1[1] as typeof item0[1];
				}
			});
			return item0;
		});
		return Object.fromEntries(_u);
	}

	protected async stoarger<T>(
		data :T,
		fn :((ctx :T) => Promise<void>)
	) {
		await fn(data);
	}
}
