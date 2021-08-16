export function* skipWhile<T, R, N>(predicate: (value: T) => boolean, iterator: Iterator<T, R, N>): Generator<T, undefined, undefined> {
    let x = iterator.next();
    while (x.done !== true) {
        if (!predicate(x.value)) {
            break;
        }
        x = iterator.next();
    }

    while (x.done !== true) {
        yield x.value;
        x = iterator.next();
    }
    return;
}
