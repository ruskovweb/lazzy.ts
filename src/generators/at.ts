import { PromiseValue } from "../common";

export function* at<T, R, N>(iterator: Iterator<T, R, N>, index: number): Generator<T | undefined, void, undefined> {
    if (index < 0) {
        yield undefined;
        return;
    }
    
    let x = iterator.next();
    while (x.done !== true) {
        if (index-- === 0) {
            yield x.value;
        }
        x = iterator.next();
    }
}

export async function* atAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, index: number): AsyncGenerator<PromiseValue<T> | undefined, void, undefined> {
    if (index < 0) {
        yield undefined;
        return;
    }

    let x = await iterator.next();
    while (x.done !== true) {
        if (index-- === 0) {
            yield x.value as PromiseValue<T>;
        }
        x = await iterator.next();
    }
}
