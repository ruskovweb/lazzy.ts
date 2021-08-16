export function* takeWhile<T, R, N>(predicate: (value: T) => boolean, iterator: Iterator<T, R, N>): Generator<T, number, undefined> {
    let counter = 0;
    while (true) {
        const x = iterator.next();
        if (x.done === true) {
            return counter;
        } else {
            if (predicate(x.value)) {
                counter++;
                yield x.value;
            } else {
                return counter;
            }
        }
    }
}
