export function* forEach<T, R, N>(iterator: Iterator<T, R, N>, action: (v: T, i: number) => void): Generator<T, R, undefined> {
    let index = 0;
    let x = iterator.next();
    while (x.done !== true) {
        action(x.value, index);
        yield x.value;
        index++;
        x = iterator.next();
    }
    return x.value;
}

export async function* forEachAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, action: (v: T, i: number) => void | Promise<void>): AsyncGenerator<T, R, undefined> {
    let index = 0;
    let x = await iterator.next();
    while (x.done !== true) {
        await action(x.value, index);
        yield x.value;
        index++;
        x = await iterator.next();
    }
    return x.value;
}
