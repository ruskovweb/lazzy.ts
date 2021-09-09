import { chain, chainAsync } from "../chain";
import { ILazyCollection, ILazyCollectionAsync } from "../contracts";

export function* lazyChunk<T, R, N>(iterator: Iterator<T, R, N>, size: number): Generator<ILazyCollection<T, void, undefined>, R, undefined> {
    if (size <= 0) {
        size = Infinity;
    }

    let x = iterator.next();
    while (x.done !== true) {
        yield chain((function* (): Generator<T, void> {
            let index = 0;
            while (index < size && x.done !== true) {
                yield x.value;
                x = iterator.next();
                index++;
            }
        })());
    }

    return x.value;
}

export async function* lazyChunkAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, size: number): AsyncGenerator<ILazyCollectionAsync<T, void, undefined>, R, undefined> {
    if (size <= 0) {
        size = Infinity;
    }

    let x = await iterator.next();
    while (x.done !== true) {
        yield chainAsync((async function* (): AsyncGenerator<T, void, undefined> {
            let index = 0;
            while (index < size && x.done !== true) {
                yield x.value;
                x = await iterator.next();
                index++;
            }
        })());
    }

    return x.value;
}
