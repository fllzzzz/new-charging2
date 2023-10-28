const queue :string[] = [
	'msg1',
	'msg2',
	'msg3',
	'msg4',
	'msg5',
];

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