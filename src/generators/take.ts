export function* take<T, R, N>(iterator: Iterator<T, R, N>, number: number): Generator<T, R | undefined, undefined> {
    while (number-- > 0) {
        const x = iterator.next();
        if (x.done === true) {
            return x.value;
        } else {
            yield x.value;
        }
    }
    if (iterator.return != null) {
        iterator.return();
    }
}
