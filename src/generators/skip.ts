export function* skip<T, R, N>(iterator: Iterator<T, R, N>, count: number): Generator<T, R, undefined> {
    let x = iterator.next();
    while (x.done !== true) {
        if (count-- <= 0) {
            yield x.value;
        }
        x = iterator.next();
    }
    return x.value
}

export async function* skipAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, count: number): AsyncGenerator<T, R, undefined> {
    let x = await iterator.next();
    while (x.done !== true) {
        if (count-- <= 0) {
            yield x.value;
        }
        x = await iterator.next();
    }
    return x.value
}
