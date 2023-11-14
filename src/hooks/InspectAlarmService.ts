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
	) :Promise<OutBound[]> {
		const result = await Promise.allSettled([
			getInspectAlarmList(
				this.inbound.StationID, pageNum
			),
			getStationInfo(this.inbound.StationID)
		]).then( pendingList => {
			return pendingList.map(item => {
				if(item.status === 'rejected') return null;
				return item.value
			})
		}).then(async dataList => {
			const alarmList = 
				((u :any) :u is InspectAlarm[] => 'alarmID' in u)(dataList[0]) ?
				dataList[0] : null;

			const stationList = 
				((u :any) :u is StationInfo[] => 'districtID' in u)(dataList[1]) ?
				dataList[1] : null;

			if(! alarmList) {
				throw new Error('failed to get insepctAlarmData');
			}

			const nameList = await Promise.allSettled(
				alarmList.map(item => getDeviceName({
					stationId: item.stationID,
					...item.device
				}))
			).then(pendingList => {
				return pendingList.map(pending => {
					if(pending.status === 'rejected') return null;
					return pending.value;
				})
			});
			
			return {
				alarmList,
				stationList,
				nameList
			}
		}).then(data => {
			return data.alarmList.map<OutBound>((item, index) => {
				const stationName = data.stationList ? 
						data.stationList[0].stationName : 'failed to get';

				const getDeviceName = (index :number) => {
					if(! (index >= 0 && index < data.nameList.length))
						return 'failed to get';

					if(! data.nameList[index]) return 'failed to get';
					return data.nameList[index] as string;
				};

				return {
					stationName,
					id: index + 1,
					alarmContent: item.alarmContent,
					monitorName: getDeviceName(index),
					alarmId: item.alarmID,
					device: item.device,
					alarmTime: item.time,
					alarmType: item.type,
					handleStatus: item.status,
					options: ['告警查看', '已处理', '处置报告'],
				}
			})
		});

		this.stoarger<typeof result>(result, (result) => {
			return new Promise(() => {
				InspectAlarmService.store.set('outbound', result);
			})
		});

		return result;
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
