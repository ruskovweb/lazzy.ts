export function* at<T, R, N>(iterator: Iterator<T, R, N>, index: number): Generator<T, R, N> {
    let x = iterator.next();
    while (x.done !== true) {
        if (index-- === 0) {
            yield x.value;
        }
        x = iterator.next();
    }
    return x.value;
}
