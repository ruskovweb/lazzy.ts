/**
 * @description Use this function only in for-of loops, otherwise you risk falling into an infinite loop.
 * Avoid all other consumers like Array.from(), new Set(), etc.
 */
export function* lazyChunk<T, R, N>(iterator: Iterator<T, R, N>, size: number): Generator<Generator<T, void>, R, N> {
    if (size <= 0) {
        size = Infinity;
    }

    let x = iterator.next();
    while (x.done !== true) {
        yield (function* (): Generator<T, void> {
            let index = 0;
            while (index < size && x.done !== true) {
                yield x.value;
                x = iterator.next();
                index++;
            }
        })();
    }

    return x.value;
}
