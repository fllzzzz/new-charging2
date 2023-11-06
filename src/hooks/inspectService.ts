import {
	DeviceInfo
} from '@/types';

type Message = {
	deviceInfo :DeviceInfo;
	keyWords :string[];
	reportId? :number;
	image? :string;
};

export default class InspectService {
	msg :Message;

	static fn :((
		msg :Message
	) => void)

	constructor(msg :Message) {
		this.msg = msg;
	}

	LocalSynchronizer() {
		InspectService.fn(this.msg);
	}

	remoteSynchronizer() {/*  */}
}