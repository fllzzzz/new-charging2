import {
	getInspectHistoryList,
	getInspectVideoReport,
	setInspectHistory,
	updateInspectHistory
} from '@/api/default';

import {
	useInspectListGetterReverse
} from '@/hooks/InspectManager';

import {
	DeviceInfo
} from '@/types';

type Data = {
	stationID :number;
	ReportTime :string;
	reportContent :string[];
	type :string;
	reportID :number;
	result :number[];
	cameraList :DeviceInfo[];
	picList :string[];
	unnormalReportContent :string[][];
};

type Param = {
	stationId :number;
	reportID :number;
	type :string;
	deviceInfo :DeviceInfo;
	image :string;
	keyWords :string[];
	result :number[];
};

export default class InspectHistoryService {
	protected constructor() {/*  */}

	protected static reqData :Data = {
		stationID: -1,
		ReportTime: '',
		reportContent: [],
		type: '',
		reportID: -1,
		result: [],
		cameraList: [],
		picList: [],
		unnormalReportContent: []
	};

	protected static async generateInspectList(
		listPageNum :number,
	) {
		const historyList = await getInspectHistoryList(listPageNum);
		const reportList = await Promise.allSettled(
			historyList.map(item => item.reportID).map(
				id => getInspectVideoReport(id)
			)
		).then(result => {
			return result.map(item => {
				if(item.status !== 'fulfilled') return {
					cameraList: [],
					unnormalReportContent: [],
					picList: [],
				};
				return item.value;
			}).map (item => {
				const _u = Object.entries(item);
				for(let i=0; i<_u.length; i++) {
					_u[i][1] = _u[i][1] ? _u[i][1] : [];
				}
				return Object.fromEntries(_u) as typeof item;
			});
		});
		return historyList.map((item, index) => {
			return {
				...item, ...reportList[index]
			}
		})
	}

	public static push(
		params :Param
	) {
		this.reqData.stationID = params.stationId;
		this.reqData.type = params.type;
		this.reqData.result = params.result;
		this.reqData.picList.push(params.image);
		this.reqData.reportContent = useInspectListGetterReverse();
		this.reqData.ReportTime = new Date().toLocaleString();
		this.reqData.cameraList.push(params.deviceInfo);
		this.reqData.unnormalReportContent.push(params.keyWords);
		this.reqData.reportID = params.reportID ? params.reportID : Date.now();
	
		setInspectHistory(this.reqData);
	}

	public static async update (
		listPageNum = 1,
		params :Pick<Param, 'reportID' | 'deviceInfo' | 'keyWords'>
	) {
		const originList = await this.generateInspectList(listPageNum);
		
		const target = originList.find(
			list => list.reportID === params.reportID
		);
		if(! target) return;

		const targetDeviceIndex = target.cameraList.findIndex(item => {
			if(
				item.channelNo === params.deviceInfo.channelNo &&
				item.deviceSerial === params.deviceInfo.deviceSerial
			) return true;
		})
		if( (! targetDeviceIndex && targetDeviceIndex !== 0) || targetDeviceIndex === -1) return;

		target.unnormalReportContent[targetDeviceIndex] = params.keyWords;

		const alarmList = target.unnormalReportContent.filter(
			item => item.length > 0
		)

		target.result = [target.unnormalReportContent.length, alarmList.length];
	
		updateInspectHistory(target);
	}
}