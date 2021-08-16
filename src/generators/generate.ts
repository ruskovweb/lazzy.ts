export function* generate<T> (func: () => T): Generator<T> {
    while (true) {
        yield func();
    }
}
