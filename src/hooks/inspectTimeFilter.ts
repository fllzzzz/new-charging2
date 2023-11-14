/* type Param = {
	dateTime :string;
	dateSplitStr :string;
	timeSplitStr :string;
};

type Time = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

export default class InspectTimeFilter {
	protected dateTime :string;
	protected dateTimeInstance :Date
	protected dateSplitStr :string;
	protected timeSplitStr :string;
	protected invoke :Map<string[], number> = new Map();

	constructor(
		params :Param
	) {
		this.dateTime = params.dateTime;
		this.timeSplitStr = params.timeSplitStr
		this.dateSplitStr = params.dateSplitStr;
		this.invoke.set(['year', 'hour'], 0);
		this.invoke.set(['month', 'minute'], 1);
		this.invoke.set(['day', 'second'], 2);
	}

	protected dateTimeSpliter() :string[]{
		return this.dateTime.split(' ');
	}

	protected invokeFinder(
		target :string
	) :number | undefined {
		for(const i of this.invoke) {
			if(! i[0].includes(target)) return;
			return i[1];
		}
	}

	protected getDateTime(
		model :Time
	) :number | undefined {
		let target :number;
		const index = this.invokeFinder(model);
		switch(model){
			case 'year':
			case 'month':
			case 'day':
				target = 0;
				break;
			case 'hour':
			case "minute":
			case "second":
				target = 1;
				break;
		}

		if(! index || ! target) return;

		const yearStr = this.dateTimeSpliter()[target]
		.split(this.dateSplitStr)[index];

		return parseInt(yearStr);
	}

	protected createDateTimeInstance(
		targetList :[Exclude<Time, 'year' | 'month'>]
	) {
		const year = this.getDateTime('year');
		const month = this.getDateTime('month');

		if(! year || ! month) return;


		new Date()
	}

	protected getCurrentWeekRange() {

	}
}; */