export function lastIndexOf<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T) => boolean): number {
    let result = -1;
    let counter = 0;
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value)) {
            result = counter;
        }
        counter++;
        x = iterator.next();
    }

    return result;
}
