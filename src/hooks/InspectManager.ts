type InspectReportType = {
	state :number; // 0 没问题， 1 有问题
	data :string;
};

const inspectContentInvokeMap = new Map<string, string[]>([
	['充电桩问题',['未归位','外观损坏','生锈']],
	['充电站环境问题',['异物','积水']],
	['充电站安全问题',['高温风险','水浸风险','火灾风险']],
]);

const inspectReportInvokeMap = new Map<string, string[]>([
	['充电枪' ,['未归位']],
	['充电桩' ,['外观损坏','生锈','高温风险']],
	['车位' ,['异物']],
	['地面' ,['积水']],
	['充电站' ,['水浸风险','火灾风险']],
]);

const invokeMapFinder = (
	invokeMap :Map<string, string[]>,
	targetList :string[]
) => {
	const result :string[] = [];
	invokeMap.forEach((value, key) => {
		for(let i=0; i < targetList.length; i++) {
			for(let j=0; j < value.length; j++) {
				if(value[j] === targetList[i]) {
					result.push(key);
					return;
				}
			}
		}
	});
	return result;
};

export const useInspectListGetter = () => {
	let arr :string[] = [];
	for(const i of inspectContentInvokeMap) {
		arr = arr.concat(i[1]);
	}
	return arr;
};

export const useInspectHistoryContentMaker = (targetList :string[]) => {
	return invokeMapFinder(
		inspectContentInvokeMap,
		targetList);
};

export const useInspectReportMaker = (targetList :string[]) => {
	const result :InspectReportType[] = [];
	const arr = invokeMapFinder(
		inspectReportInvokeMap, targetList);
	inspectReportInvokeMap.forEach((value, key) => {
		if(arr.includes(key)) {
			value.forEach(item => {
				if(targetList.includes(item))
					result.push({
						state: 1,
						data: `${key}有${item}`
					});
				else 
					result.push({
						state: 0,
						data: `${key}无${item}`
					});
			});
		}else {
			value.forEach(item => {
				result.push({
					state: 0,
					data: `${key}无${item}`
				});
			});
		}
	});
	return result;
};