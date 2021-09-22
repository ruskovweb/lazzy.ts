import { PromiseValue } from "../common";

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

export async function* forEachAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, action: (v: PromiseValue<T>, i: number) => void | Promise<void>): AsyncGenerator<PromiseValue<T>, R, undefined> {
    let index = 0;
    let x = await iterator.next();
    while (x.done !== true) {
        const value = await Promise.resolve(x.value) as PromiseValue<T>;
        await action(value, index);
        yield value;
        index++;
        x = await iterator.next();
    }
    return x.value;
}
