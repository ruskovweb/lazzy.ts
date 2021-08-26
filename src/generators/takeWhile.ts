export function* takeWhile<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T) => boolean): Generator<T, R | undefined, undefined> {
    let x = iterator.next();
    while (x.done !== true) {
        if (!predicate(x.value)) {
            break;
        }
        yield x.value;
        x = iterator.next();
    }

    if (x.done === true) {
        return x.value;
    }
}
