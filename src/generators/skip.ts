export function* skip<T, R, N>(number: number, iterator: Iterator<T, R, N>): Generator<T, R | undefined, undefined> {
    while (number-- > 0) {
        const x = iterator.next();
        if (x.done === true) {
            return x.value;
        }
    }
    while (true) {
        const x = iterator.next();
        if (x.done === true) {
            return x.value;
        } else {
            yield x.value;
        }
    }
}
