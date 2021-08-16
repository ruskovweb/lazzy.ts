export function toWeakMap<T, R, N, K extends object, V>(select: (value: T) => [K, V], iterator: Iterator<T, R, N>): WeakMap<K, V> {
    const result = new WeakMap<K, V>();
    let x = iterator.next();
    while (x.done !== true) {
        const [key, value] = select(x.value);
        result.set(key, value);
        x = iterator.next();
    }
    return result;
}
