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

export class InspectAlarmService {
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

	push() {}
	pull() {}
	update() {}
};