import { PromiseValue } from "../common";

export function* repeat<T, R, N>(iterator: Iterator<T, R, N>, count: number): Generator<T, R, undefined> {
    if (count < 0) {
        count = 0;
    }

    let x = iterator.next();
    while (x.done !== true) {
        for (let i = 0; i <= count; i++) {
            yield x.value;
        }
        x = iterator.next();
    }

    return x.value;
}

export async function* repeatAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, count: number): AsyncGenerator<PromiseValue<T>, R, undefined> {
    if (count < 0) {
        count = 0;
    }

    let x = await iterator.next();
    while (x.done !== true) {
        for (let i = 0; i <= count; i++) {
            yield x.value as PromiseValue<T>;
        }
        x = await iterator.next();
    }

    return x.value;
}
