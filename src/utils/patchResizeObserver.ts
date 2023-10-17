const debounce = (callback: ((...args :any[]) => any), delay: number) => {
    let tid: any
    return function () {
        tid && clearTimeout(tid);
        tid = setTimeout(() => {
            callback()
        }, delay)
    }
}

export default () => {
    const _ = (window as any).ResizeObserver;
    (window as any).ResizeObserver = class ResizeObserver extends _ {
        constructor(callback: any) {
            callback = debounce(callback, 20)
            super(callback);
        }
    }
}