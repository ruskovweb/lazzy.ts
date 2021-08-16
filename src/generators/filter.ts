export function* filter<T, R, N>(predicate: (value: T) => boolean, iterator: Iterator<T, R, N>): Generator<T, R | undefined, undefined> {
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value)) {
            yield x.value;
        }
        x = iterator.next();
    }
    return x.value;
}
