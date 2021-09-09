export function* concat<T>(...iterators: Array<Iterator<T, unknown, unknown>>): Generator<T, void, undefined> {
    for (const iterator of iterators) {
        let x = iterator.next();
        while (x.done !== true) {
            yield x.value;
            x = iterator.next();
        }
    }
}

export async function* concatAsync<T>(...iterators: Array<Iterator<T, unknown, unknown> | AsyncIterator<T, unknown, unknown>>): AsyncGenerator<T, void, undefined> {
    for (const iterator of iterators) {
        let x = await iterator.next();
        while (x.done !== true) {
            yield x.value;
            x = await iterator.next();
        }
    }
}
