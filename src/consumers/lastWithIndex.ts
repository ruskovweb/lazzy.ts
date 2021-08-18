export function lastWithIndex<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T) => boolean): [T | undefined, number] {
    let index = 0;
    let result: [T | undefined, number] = [undefined, -1];

    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value)) {
            result[0] = x.value;
            result[1] = index;
        }
        index++;
        x = iterator.next();
    }

    return result;
}
