export function* prepend<T, R, N>(iterator: Iterator<T, R, N>, ...iterables: Array<Iterable<T>>): Generator<T, R, undefined> {
    for (const iterable of iterables) {
        for (const value of iterable) {
            yield value;
        }
    }

    let x = iterator.next();
    while (x.done !== true) {
        yield x.value;
        x = iterator.next();
    }
    return x.value;
}
