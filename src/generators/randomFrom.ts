export function* randomFrom<T> (array: T[]): Generator<T, never, never> {
    while (true) {
        yield array[Math.trunc(Math.random() * array.length)];
    }
}