export function* toLazy<T>(iterable: Iterable<T>): Generator<T, void, undefined> {
    for (const element of iterable) {
        yield element;
    }
}
