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

export type ctid_14521 = {
	StationNumber :number;
	StationID :string;
	StationName :string;
	Report :string;
};

export type ctid_12721 = {
	chargestationid :string
};

export type ctid_12821 = {
	cameraId :string;
	cameraType :string;
	deviceSerial :string;
	channelNo :number;
	tisIOnline :number;
};

export type ctid_13021 = {
	surveillancecameraid :string;
	percent :string;
	CameraID :string;
	percent :string;
	deviceSerial :string;
	channelNo :number;
}; 