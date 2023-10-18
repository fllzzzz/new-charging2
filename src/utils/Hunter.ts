export default async <T=any>(
	targetFn :() => T,
	poachPolice :{
		cycle :number;
		frequency :number;
		timing? :(target :T) => boolean;
	}
) => {
	let flg = 0;
	let target :T;
	return await new Promise<T>((resolve, reject) => {
		const looper = () => {
			flg++;
			target = targetFn();
			if(poachPolice.timing) {
				if(flg >= poachPolice.frequency) 
					return reject('ERROE_FREQUENCY_OUT');
				if(poachPolice.timing(target))
					return resolve(target);
				else
					return setTimeout(() => looper(),
				poachPolice.cycle);
			}
			if(typeof target === 'boolean') return resolve(target);
			if(target) return resolve(target);
			if(flg >= poachPolice.frequency) return reject('ERROE_FREQUENCY_OUT');
			setTimeout(() => looper(), poachPolice.cycle);
		}
		looper();
	})
};