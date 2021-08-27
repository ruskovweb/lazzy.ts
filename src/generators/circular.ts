export function* circular<T>(iterable: Iterable<T>): Generator<T, void, undefined> {
    while (true) {
        for (const e of iterable) {
            yield e;
        }
    }
}
