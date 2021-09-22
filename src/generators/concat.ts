import { AsPromise, PromiseValue } from "../common";

export function* concat<T>(...iterators: Array<Iterator<T, unknown, unknown>>): Generator<T, void, undefined> {
    for (const iterator of iterators) {
        let x = iterator.next();
        while (x.done !== true) {
            yield x.value;
            x = iterator.next();
        }
    }
}

export async function* concatAsync<T, R, N>(source: AsyncIterator<T, R, N>, ...iterators: Array<Iterator<AsPromise<T> | PromiseValue<T>, unknown, unknown> | AsyncIterator<AsPromise<T> | PromiseValue<T>, unknown, unknown>>): AsyncGenerator<PromiseValue<T>, void, undefined> {
    let s = await source.next();
    while (s.done !== true) {
        yield s.value as PromiseValue<T>;
        s = await source.next();
    }
    
    for (const iterator of iterators) {
        let x = await iterator.next();
        while (x.done !== true) {
            yield x.value;
            x = await iterator.next();
        }
    }
}
