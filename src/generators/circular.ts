export function* circular<T>(iterable: Iterable<T>): Generator<T, void, undefined> {
    while (true) {
        for (const e of iterable) {
            yield e;
        }
    }
}

export async function* circularAsync<T>(iterable: AsyncIterable<T>): AsyncGenerator<T, void, undefined> {
    while (true) {
        for await (const e of iterable) {
            yield e;
        }
    }
}
