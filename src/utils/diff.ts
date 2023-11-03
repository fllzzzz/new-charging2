const Pool = new Map<string, any>();

export default <T=any>(
	name :string,
	data :T,
	differ :((
		oldValue :T,
		newValue :T
	) => boolean),
	fn :((
		newValue :T
	) => void)
) => {
	const poolValue = Pool.get(name);
	if(!poolValue) {
		fn(data);
		Pool.set(name, data);
		return;
	}
	if(differ(poolValue, data)) {
		fn(data);
		Pool.set(name, data);
	}
}