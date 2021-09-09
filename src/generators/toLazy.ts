export function* toLazy<T>(iterable: Iterable<T>): Generator<T, void, undefined> {
    yield * iterable;
}

export async function* toLazyAsync<T>(iterable: AsyncIterable<T>): AsyncGenerator<T, void, undefined> {
    yield * iterable;
}
