export function* filterWithIndex<T, R, N>(predicate: (value: T) => boolean, iterator: Iterator<T, R, N>): Generator<[T, number], R | undefined, undefined> {
    let counter = 0;
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value)) {
            yield [x.value, counter];
        }
        x = iterator.next();
        counter++;
    }
    return x.value;
}