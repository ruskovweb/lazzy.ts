import { PromiseValue } from "../common";

export function* chunk<T, R, N>(iterator: Iterator<T, R, N>, size: number): Generator<T[], R, N> {
    if (size <= 0) {
        size = Infinity;
    }

    let index = 1;
    let piece: T[] = [];
    let x = iterator.next();
    while (x.done !== true) {
        piece.push(x.value);
        x = iterator.next();
        if (index % size === 0 || x.done === true) {
            yield piece;
            piece = [];
        }
        index++;
    }

    return x.value;
}

export async function* chunkAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, size: number): AsyncGenerator<PromiseValue<T>[], R, N> {
    if (size <= 0) {
        size = Infinity;
    }

    let index = 1;
    let piece: PromiseValue<T>[] = [];
    let x = await iterator.next();
    while (x.done !== true) {
        piece.push(x.value as PromiseValue<T>);
        x = await iterator.next();
        if (index % size === 0 || x.done === true) {
            yield piece;
            piece = [];
        }
        index++;
    }

    return x.value;
}
