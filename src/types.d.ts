export type MonitorVideoBox = {
	model :number; // 0: close 1: small, 2: middle, 3: full,
};

export type DeviceInfo = {
	deviceSerial :string;
	channelNo :number;
}

export type SenselessTrackingVideoBox = {
	model :number;
	deviceInfo :DeviceInfo | null;
};

export type VideoBoxHeaderBtnState = {
	name :string;
	state :number;
};