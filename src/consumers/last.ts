export function last<T, R, N>(iterator: Iterator<T, R, N>, predicate?: (value: T) => boolean): T | undefined {
    let x = iterator.next();
    let result: T | undefined;
    while (x.done !== true) {
        if (predicate == null || predicate(x.value)) {
            result = x.value;
        }
        x = iterator.next();
    }
    return result;
}
