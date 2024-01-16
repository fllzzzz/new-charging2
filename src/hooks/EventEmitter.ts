type EventType = {
	ctx :any;
	callbacks :((ctx :any, ...args :any[]) => void)[];
};

const eventPool = new Map<string, EventType>();

export const usePublish = <T>(
	eventType :string, 
	ctx :T
) :void => {
	let eventCtx :EventType | undefined;
	eventCtx = eventPool.get(eventType);
	if(eventCtx) eventCtx.ctx = ctx;
	else {
		eventPool.set(eventType,{
			ctx,
			callbacks: [] as (() => void)[],
		});
		eventCtx = eventPool.get(eventType);
	}

	if(eventCtx!.callbacks.length === 0) return;

	eventCtx!.callbacks.forEach(callback => {
		callback(eventCtx!.ctx);
	});
};

export const useSubscribe = <T>(
	eventType :string, 
	callback :(ctx :T, ...args :any[]) => void | boolean
) :number => {
	let eventCtx :EventType | undefined;
	eventCtx = eventPool.get(eventType);
	if(eventCtx) {
		eventCtx.callbacks.push(callback);
		if(eventCtx.ctx) {
			if(callback(eventCtx.ctx)) {
				eventPool.delete(eventType);
			}
		}
	}else 
		eventPool.set(eventType,{
			ctx: null,
			callbacks: [callback] as ((ctx :any, ...args :any[]) => void)[],
		});
		eventCtx = eventPool.get(eventType);
	
	return eventCtx!.callbacks.findIndex(callbacks => {
		return callbacks === callback;
	});
};

export const useUnSubscribe = (
	eventType :string, 
	index :number
) :void => {
	const eventCtx :EventType | undefined = eventPool.get(eventType);
	if(eventCtx) eventCtx.callbacks.splice(index,1);
}
