import {
	DeviceInfo
} from '@/types';

import {

} from '@/api/default';

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