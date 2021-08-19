export function* fill<T, R, N>(iterator: Iterator<T, R, N>, value: T, start = 0, end?: number): Generator<T, R, N> {
    let index = 0;
    let x = iterator.next();

    while (x.done !== true) {
        if (index >= start && (end == null || index < end)) {
            yield value;
        } else {
            yield x.value;
        }

        x = iterator.next();
        index++;
    }

    return x.value;
}
