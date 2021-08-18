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
