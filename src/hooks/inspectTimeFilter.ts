export const useGetCurrentWeekRanges = () :string[] | undefined => {
	let startIndex :number;
	let endIndex :number;

	const metadata = {
		weekLength: 7,
		weekStartIndex: 1,
		weekEndIndex: 7
	};

	const date = new Date();
	const currentIndex = date.getDay();
	
	if(
		(currentIndex && (currentIndex > 6 || currentIndex < 0)) ||
		(! currentIndex && currentIndex !== 0)
	) return;

	if(currentIndex === 0) {
		startIndex = metadata.weekStartIndex - metadata.weekEndIndex;
		endIndex = currentIndex;
	}else {
		startIndex = metadata.weekStartIndex - currentIndex;
		endIndex = metadata.weekEndIndex - currentIndex;
	}

	if(! startIndex || ! endIndex) return;

	const currentDate = date.getDate();
	startIndex = startIndex + currentDate;
	endIndex = endIndex + currentDate;

	const u =  [
		new Date(
			date.getFullYear(),
			date.getMonth(),
			startIndex
		),
		new Date(
			date.getFullYear(),
			date.getMonth(),
			endIndex
		)
	]

	return [
		`${u[0].getFullYear()}-${u[0].getMonth() + 1}-${u[0].getDate()}`,
		`${u[1].getFullYear()}-${u[1].getMonth() + 1}-${u[1].getDate()}`,
	];
}

export const useGetCurrentMonthRanges = () => {
	const date = new Date();
	return [
		`${date.getFullYear()}-${date.getMonth() + 1}-01`,
		`${date.getFullYear()}-${date.getMonth() + 1}-31`
	]
}

export const useGetCurrentDayRanges = () => {
	const date = new Date();
	return [
		`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
		`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
	]
}	