export function* indices<T, R, N>(predicate: (value: T) => boolean, iterator: Iterator<T, R, N>): Generator<number, R, N> {
    let counter = 0;
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value)) {
            yield counter;
        }
        counter++;
        x = iterator.next();
    }
    return x.value;
}
