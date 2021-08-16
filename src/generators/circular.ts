export function* circular<T>(iterable: Iterable<T>): Generator<T, undefined, undefined> {
    while (true) {
        for (const e of iterable) {
            yield e;
        }
    }
}
