export function* append<T, R, N>(iterator: Iterator<T, R, N>, ...iterables: Array<Iterable<T>>): Generator<T, R, N> {
    let x = iterator.next();
    while (x.done !== true) {
        yield x.value;
        x = iterator.next();
    }
    const resuls = x.value;

    for (const iterable of iterables) {
        for (const value of iterable) {
            yield value;
        }
    }

    return resuls;
}

export async function* appendAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, ...iterables: Array<Iterable<T> | AsyncIterable<T>>): AsyncGenerator<T, R, N> {
    let x = await iterator.next();
    while (x.done !== true) {
        yield x.value;
        x = await iterator.next();
    }
    const resuls = x.value;

    for (const iterable of iterables) {
        for await (const value of iterable) {
            yield value;
        }
    }

    return resuls;
}
