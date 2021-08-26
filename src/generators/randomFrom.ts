export function* randomFrom<T> (array: T[]): Generator<T, void, undefined> {
    while (true) {
        yield array[Math.trunc(Math.random() * array.length)];
    }
}