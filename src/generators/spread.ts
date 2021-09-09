import { isIterable } from "../common/helpers";

export function* spread<T, R, N>(iterator: Iterator<T, R, N>): Generator<T extends Iterable<infer U> ? U : T, R, undefined> {
    let x = iterator.next();
    while (x.done !== true) {
        if (isIterable(x.value) && (typeof x.value !== "string" || x.value.length > 1)) {
            const iter = (x.value as unknown as IterableIterator<unknown>)[Symbol.iterator]();
            for (const element of iter) {
                yield element as T extends Iterable<infer U> ? U : T;
            }
        } else {
            yield x.value as T extends Iterable<infer U> ? U : T;
        }
        x = iterator.next();
    }
    return x.value;
}

export async function* spreadAsync<T, R, N>(iterator: AsyncIterator<T, R, N>): AsyncGenerator<T extends Iterable<infer U> | AsyncIterable<infer U> ? U : T, R, undefined> {
    let x = await iterator.next();
    while (x.done !== true) {
        if (isIterable(x.value) && (typeof x.value !== "string" || x.value.length > 1)) {
            const iter = (x.value as unknown as IterableIterator<unknown>)[Symbol.iterator]();
            for (const element of iter) {
                yield element as T extends Iterable<infer U> | AsyncIterable<infer U> ? U : T;
            }
        } else {
            yield x.value as T extends Iterable<infer U> | AsyncIterable<infer U> ? U : T;
        }
        x = await iterator.next();
    }
    return x.value;
}
