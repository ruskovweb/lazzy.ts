export function toMap<T, R, N, K, V>(select: (value: T) => [K, V], iterator: Iterator<T, R, N>): Map<K, V> {
    const result = new Map<K, V>();
    let x = iterator.next();
    while (x.done !== true) {
        const [key, value] = select(x.value);
        result.set(key, value);
        x = iterator.next();
    }
    return result;
}
