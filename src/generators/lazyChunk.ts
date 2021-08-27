import { chain } from "../chain";
import { ILazyCollection } from "../contracts";

/**
 * @description You must consume the returned chunk immediately, otherwise you will fall into an infinite loop.
 */
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
