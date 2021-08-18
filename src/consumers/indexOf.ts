export function indexOf<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T) => boolean): number {
    let counter = 0;
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value)) {
            return counter;
        }
        counter++;
        x = iterator.next();
    }

    return -1;
}
