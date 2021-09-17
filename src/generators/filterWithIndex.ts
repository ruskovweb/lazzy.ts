import { PromiseValue } from "../common";

export function* filterWithIndex<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T, index: number) => boolean): Generator<[T, number], R, undefined> {
    let index = 0;
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value, index)) {
            yield [x.value, index];
        }
        x = iterator.next();
        index++;
    }
    return x.value;
}

export async function* filterWithIndexAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, predicate: (value: PromiseValue<T>, index: number) => boolean | Promise<boolean>): AsyncGenerator<[PromiseValue<T>, number], R, undefined> {
    let index = 0;
    let x = await iterator.next();
    while (x.done !== true) {
        const value = await Promise.resolve(x.value) as PromiseValue<T>;
        if (await predicate(value, index)) {
            yield [value, index];
        }
        x = await iterator.next();
        index++;
    }
    return x.value;
}
