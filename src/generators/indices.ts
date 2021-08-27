export function* indices<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T) => boolean): Generator<number, R, undefined> {
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
