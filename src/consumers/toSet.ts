export function toSet<T, R, N>(iterator: Iterator<T, R, N>): Set<T> {
    const result: Set<T> = new Set();
    let x = iterator.next();
    while (x.done !== true) {
        result.add(x.value);
        x = iterator.next();
    }
    return result;
}
