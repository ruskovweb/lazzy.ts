export function* feed<T, R, R2, N, V>(into: Iterator<T, R2, N>, from: Iterator<V, R, T>): Generator<V, void, undefined> {
    let x = into.next();
    while (x.done !== true) {
        const r = from.next(x.value);
        if (r.done === true) {
            return;
        }
        yield r.value;
        x = into.next();
    }
}

export async function* feedAsync<T, R, R2, N, V>(into: AsyncIterator<T, R2, N>, from: Iterator<V, R, T> | AsyncIterator<V, R, T>): AsyncGenerator<V, void, undefined> {
    let x = await into.next();
    while (x.done !== true) {
        const r = await from.next(x.value);
        if (r.done === true) {
            return;
        }
        yield r.value;
        x = await into.next();
    }
}
