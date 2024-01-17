import {
	computed,
	ref
} from 'vue';

export const ctid13511_isSet = ref(false);
export const inspectReportId = ref<number | undefined>(undefined);

export const stationID = {
	get value() {
		const target = sessionStorage.getItem('stationID');
	
		return target
		? parseInt(target)
		: null;
	}
};

export const setStationId = (
	stationID :number | undefined
) => sessionStorage.setItem('stationID', `${stationID}`);


export const isMapInit = ref(true);
export const isMonitorFullOnly = ref(true);