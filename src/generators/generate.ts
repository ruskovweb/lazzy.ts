export function* generate<T> (callback: () => T): Generator<T, void, undefined> {
    while (true) {
        yield callback();
    }
}

export async function* generateAsync<T> (callback: () => T | Promise<T>): AsyncGenerator<T, void, undefined> {
    while (true) {
        yield callback();
    }
}
