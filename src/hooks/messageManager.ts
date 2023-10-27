type Level = keyof typeof messageLevel;

type Msg<T> = {
	level :Level,
	ctx :T
};

enum messageLevel {
	'error' = 1,
	'info' = 2,
	'debug' = 3
}

export const useMsgHandler = <T=any>(
	level :Level,
	ctx :T
) :Msg<T> | undefined => {
	if(messageLevel[level] <= 2) {
		return {
			level,
			ctx
		}
	}
};