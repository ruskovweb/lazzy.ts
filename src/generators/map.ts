export function* map<T, R, N, V>(iterator: Iterator<T, R, N>, transformer: (v: T, index: number) => V): Generator<V, R, undefined> {
    let index = 0;
    let x = iterator.next();
    while (x.done !== true) {
        yield transformer(x.value, index++);
        x = iterator.next();
    }
    return x.value;
}

export async function* mapAsync<T, R, N, V>(iterator: AsyncIterator<T, R, N>, transformer: (v: T, index: number) => V): AsyncGenerator<V, R, undefined> {
    let index = 0;
    let x = await iterator.next();
    while (x.done !== true) {
        yield transformer(x.value, index++);
        x = await iterator.next();
    }
    return x.value;
}
