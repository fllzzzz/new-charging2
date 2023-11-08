import {
	useInspectListGetter
} from '@/hooks/InspectManager';

import {
	DeviceInfo
} from '@/types';

type RequestData = {
/* @@ */	reportTime :string;							// 生成 动态
/* @@ */	reportContent :string[];					// 获取 静态


	type :string;								// 传入 动态	远程（提交）


	reportID :number;							// 传入 动态 	远程（提交 更新）
	result :number[];							// 传入 动态	远程（提交 更新）


	cameraList :DeviceInfo[];					// 传入 动态	远程（提交）	本地（提交）
	picList :string[];							// 传入 动态	远程（提交）	本地（提交）


	unnormalReportContent :string[][];			// 传入 动态	远程（提交 更新）	本地（提交 更新）
};


type RemoteParam = {
	reportID :number;
	inspectType :string;
	inspectResult :number[];
	deviceInfo :DeviceInfo;
	image :string;
	keyWords :string[]
};


class InspectService {
	protected static reqData :Partial<RequestData> = {
		reportContent: useInspectListGetter()
	};

	protected static init() {
		InspectService.reqData.reportTime = new Date().toLocaleString();
	};
}

export class InspectServiceRemote extends InspectService {
	
	constructor() {
		super();
		InspectService.init();
	}

	push(
		params :RemoteParam
	) {
		InspectService.reqData.type = params.inspectType;
		InspectService.reqData.reportID = params.reportID;
		InspectService.reqData.result = params.inspectResult;
		InspectService.reqData.cameraList?.push(params.deviceInfo);
		InspectService.reqData.picList?.push(params.image);
		InspectService.reqData.unnormalReportContent?.push(params.keyWords);
	
		/* api call */
	}

	update(
		params :RemoteParam
	) {
		/*  */
	}
};