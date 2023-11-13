import {
	useReportUpdater,
	useReportMaker
} from '@/store/videoReport';

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

type PresetUpdate = {
	device :DeviceInfo,
	image :string;
	keyWords :string[];
};

export default class InspectHistoryService {
	protected constructor() {/*  */}
	protected static lock = 1;
	protected static resultFlg = [0 ,0];

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
		const historyList = await getInspectHistoryList(listPageNum, 1);
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

	public static init() {
		this.reqData = {
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

		this.resultFlg = [0 ,0];
	}

	public static push(
		params :Param
	) {

		if(this.reqData.cameraList.length > 0) {
			const targetIndex = this.reqData.cameraList.findIndex(device => {
				if(
					device.channelNo === params.deviceInfo.channelNo &&
					device.deviceSerial === params.deviceInfo.deviceSerial
				) return true;
			})
			if( (! targetIndex && targetIndex !== 0) || (targetIndex && targetIndex === -1) ) {
				this.lock = 0;
			}

			if(this.lock === 1) {
				this.reqData.cameraList[targetIndex] = params.deviceInfo;
				this.reqData.picList[targetIndex] = params.image;
				this.reqData.unnormalReportContent[targetIndex] = params.keyWords

				return;
			} 
		}else {
			this.lock = 0;
		}

		if(this.lock === 1) return;

		this.resultFlg[0]++;
		if(params.keyWords.length > 0) this.resultFlg[1]++;
		this.reqData.result = this.resultFlg;

		this.reqData.stationID = params.stationId;
		this.reqData.type = params.type;
		this.reqData.picList.push(params.image);
		this.reqData.reportContent = useInspectListGetterReverse();
		this.reqData.ReportTime = new Date().toLocaleString();
		this.reqData.cameraList.push(params.deviceInfo);
		this.reqData.unnormalReportContent.push(params.keyWords);
		this.reqData.reportID = params.reportID ? params.reportID : Date.now();
	
		const _u = this.reqData.cameraList.map((device, index) => {
			return {
				id: index,
				deviceInfo: device,
				title: device.deviceSerial + '@' + device.channelNo,
				image: this.reqData.picList[index],
				keyWord: this.reqData.unnormalReportContent[index],
			}
		});
		useReportMaker(undefined, _u);

		setInspectHistory(this.reqData);

		this.lock = 1;
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
	
		useReportUpdater(undefined, {
			device: params.deviceInfo,
			keyWords: params.keyWords
		})
		updateInspectHistory(target);
	}
}