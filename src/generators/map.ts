export function* map<T, R, N, V>(iterator: Iterator<T, R, N>, transformer: (v: T) => V): Generator<V, R, undefined> {
    let x = iterator.next();
    while (x.done !== true) {
        yield transformer(x.value);
        x = iterator.next();
    }
    return x.value;
}
