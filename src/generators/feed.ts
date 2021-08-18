export function* feed<T, R1, R2, N, V>(source: Iterator<T, R2, N>, into: Iterator<V, R1, T>): Generator<V, undefined, undefined> {
    let x = source.next();
    while (x.done !== true) {
        const r = into.next(x.value);
        if (r.done === true) {
            return;
        }
        yield r.value;
        x = source.next();
    }
    return;
}
