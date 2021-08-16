export function last<T, R, N>(predicate: (value: T) => boolean, iterator: Iterator<T, R, N>): T | undefined {
    let x = iterator.next();
    let result: T | undefined;
    while (x.done !== true) {
        if (predicate(x.value)) {
            result = x.value;
        }
        x = iterator.next();
    }
    return result;
}
