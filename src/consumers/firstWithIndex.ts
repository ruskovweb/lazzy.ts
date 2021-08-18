export function firstWithIndex<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T) => boolean): [T | undefined, number] {
    let index = 0;

    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value)) {
            return [x.value, index];
        }
        index++;
        x = iterator.next();
    }

    return [undefined, -1]
}
