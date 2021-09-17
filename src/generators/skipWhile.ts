import { PromiseValue } from "../common";

export function* skipWhile<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T, index: number) => boolean): Generator<T, R, undefined> {
    let index = 0;
    let x = iterator.next();
    while (x.done !== true) {
        if (!predicate(x.value, index++)) {
            break;
        }
        x = iterator.next();
    }

    while (x.done !== true) {
        yield x.value;
        x = iterator.next();
    }

    return x.value;
}

export async function* skipWhileAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, predicate: (value: PromiseValue<T>, index: number) => boolean | Promise<boolean>): AsyncGenerator<PromiseValue<T>, R, undefined> {
    let index = 0;
    let x = await iterator.next();
    while (x.done !== true) {
        if (!await predicate(await Promise.resolve(x.value) as PromiseValue<T>, index++)) {
            break;
        }
        x = await iterator.next();
    }

    while (x.done !== true) {
        yield x.value as PromiseValue<T>;
        x = await iterator.next();
    }

    return x.value;
}
