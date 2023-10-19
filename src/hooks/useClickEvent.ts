type data = {
	id :number;
	name :string;
	state :number;
	imageList :string[];
	[key :string] :any;
};

export default {
	getTarget<T=unknown>(
		event :MouseEvent,
		data :data[],
		fn :((item :data) => string)
	) {
		const id = (event.target as HTMLElement).id;
		const targetData = data.find(item => {
			return fn(item) === id;
		});

		if(!targetData) return undefined;

		return {
			ElementID: id,
			data: targetData
		};
	},
	slefClose(
		data :data,
		fn :(() => void)
	) {
		if(data.state === 1) {
			fn();
		}
	}
};