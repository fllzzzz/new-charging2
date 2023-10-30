const queue :string[] = [];

export const usePushMessage = (
	msg :any
) => {
	queue.push(JSON.stringify(msg));
};

export const usePullMessage = () => {
	const msg = queue[0];
	queue.shift();
	return msg;
};