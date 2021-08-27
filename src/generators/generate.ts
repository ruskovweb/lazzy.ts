export function* generate<T> (callback: () => T): Generator<T, void, undefined> {
    while (true) {
        yield callback();
    }
}
