export function count<T, R, N>(iterator: Iterator<T, R, N>): number {
    let counter = 0;
    let x = iterator.next();
    while (x.done !== true) {
        counter++;
        x = iterator.next();
    }
    return counter;
}
