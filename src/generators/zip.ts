export function* zip<T, R, N, T2, R2, TResult>(iterator1: Iterator<T, R, N>, iterator2: Iterator<T2, R2, N>, resultSelector: (first: T, second: T2) => TResult): Generator<TResult, R | R2 | undefined, undefined> {
    let v1 = iterator1.next();
    let v2 = iterator2.next();
    while (v1.done !== true && v2.done !== true) {
        yield resultSelector(v1.value, v2.value);
        v1 = iterator1.next();
        v2 = iterator2.next();
    }

    return v1.done === true ? v1.value : v2.done === true ? v2.value : undefined;
}
