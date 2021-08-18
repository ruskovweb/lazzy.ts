export function first<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T) => boolean): T | undefined {
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value)) {
            return x.value;
        }
        x = iterator.next();
    }
    return undefined;
}
