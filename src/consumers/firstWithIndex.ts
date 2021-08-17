export function firstWithIndex<T, R, N>(predicate: (value: T) => boolean, iterator: Iterator<T, R, N>): [T | undefined, number] {
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
