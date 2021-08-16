export function* pair<T, R, N>(iterator: Iterator<T, R, N>): Generator<[T, T], R, N> {
    let prev: T | undefined;
    let x = iterator.next();
    while (x.done !== true) {
        if (prev !== undefined) {
            yield [prev, x.value];
        }
        prev = x.value;
        x = iterator.next();
    }
    return x.value;
}
