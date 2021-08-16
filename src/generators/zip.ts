export function* zip<T1, T2, R, N, TResult>(iterator1: Iterator<T1, R, N>, iterator2: Iterator<T2, R, N>, resultSelector: (first: T1, second: T2) => TResult): Generator<TResult, R | undefined, N> {
    let v1 = iterator1.next();
    let v2 = iterator2.next();
    while (v1.done !== true && v2.done !== true) {
        yield resultSelector(v1.value, v2.value);
        v1 = iterator1.next();
        v2 = iterator2.next();
    }
    return v1.done === true ? v1.value : v2.done === true ? v2.value : undefined;
}
