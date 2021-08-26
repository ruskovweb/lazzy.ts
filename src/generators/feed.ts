export function* feed<T, R1, R2, N, V>(into: Iterator<T, R2, N>, from: Iterator<V, R1, T>): Generator<V, undefined, undefined> {
    let x = into.next();
    while (x.done !== true) {
        const r = from.next(x.value);
        if (r.done === true) {
            return;
        }
        yield r.value;
        x = into.next();
    }
    return;
}
