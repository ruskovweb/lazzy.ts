export type Interceptor<C, T> = (iteration: number, context: C, value: T) => void;
export interface Interceptors<TContext, TValue, TReturn> {
    before?: Interceptor<TContext, undefined>;
    beforeEach?: Interceptor<TContext, TValue>;
    afterEach?: Interceptor<TContext, TValue>;
    afterUpdate?: Interceptor<TContext, TValue | TReturn>;
    after?: Interceptor<TContext, TReturn>;
}

export function* intercept<T, R, N, C>(iterator: Iterator<T, R, N>, interceptors: Interceptors<C, T, R>, context: C): Generator<T, R, N> {
    const tryInterceptor = function <TContext extends C, T>(interceptor: Interceptor<TContext, T> | undefined, i: number, c: TContext, d: T): void {
        if (interceptor != null) {
            interceptor(i, c, d);
        }
    };

    let iteration = 0;

    tryInterceptor<C, undefined>(interceptors.before, iteration, context, undefined);

    let curr = iterator.next();
    while (curr.done !== true) {
        tryInterceptor<C, T>(interceptors.beforeEach, iteration, context, curr.value);

        yield curr.value;

        tryInterceptor<C, T>(interceptors.afterEach, iteration, context, curr.value);

        curr = iterator.next();

        tryInterceptor<C, T | R>(interceptors.afterUpdate, iteration, context, curr.value);
        iteration++;
    }

    tryInterceptor<C, R>(interceptors.after, iteration - 1, context, curr.value);
    return curr.value;
}
