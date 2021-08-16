export function* toLazy<T>(iterable: Iterable<T>): Generator<T, undefined, undefined> {
    for (const element of iterable) {
        yield element;
    }
    return;
}
