export function* filter<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T) => boolean): Generator<T, R, undefined> {
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value)) {
            yield x.value;
        }
        x = iterator.next();
    }
    return x.value;
}
