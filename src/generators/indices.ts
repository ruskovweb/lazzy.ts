import { PromiseValue } from "../common";

export function* indices<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T, index: number) => boolean): Generator<number, R, undefined> {
    let index = 0;
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value, index)) {
            yield index;
        }
        index++;
        x = iterator.next();
    }
    return x.value;
}

export async function* indicesAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, predicate: (value: PromiseValue<T>, index: number) => boolean | Promise<boolean>): AsyncGenerator<number, R, undefined> {
    let index = 0;
    let x = await iterator.next();
    while (x.done !== true) {
        if (await predicate(await Promise.resolve(x.value) as PromiseValue<T>, index)) {
            yield index;
        }
        index++;
        x = await iterator.next();
    }
    return x.value;
}
