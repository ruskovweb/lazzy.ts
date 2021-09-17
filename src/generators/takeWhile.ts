import { PromiseValue } from "../common";

export function* takeWhile<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T, index: number) => boolean): Generator<T, R | undefined, undefined> {
    let index = 0;
    let x = iterator.next();
    while (x.done !== true) {
        if (!predicate(x.value, index++)) {
            break;
        }
        yield x.value;
        x = iterator.next();
    }

    if (x.done === true) {
        return x.value;
    }
}

export async function* takeWhileAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, predicate: (value: PromiseValue<T>, index: number) => boolean | Promise<boolean>): AsyncGenerator<PromiseValue<T>, R | undefined, undefined> {
    let index = 0;
    let x = await iterator.next();
    while (x.done !== true) {
        if (!await predicate(await Promise.resolve(x.value) as PromiseValue<T>, index++)) {
            break;
        }
        yield x.value as PromiseValue<T>;
        x = await iterator.next();
    }

    if (x.done === true) {
        return x.value;
    }
}
