export function first<T, R, N>(predicate: (value: T) => boolean, iterator: Iterator<T, R, N>): T | undefined {
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value)) {
            return x.value;
        }
        x = iterator.next();
    }
    return undefined;
}
