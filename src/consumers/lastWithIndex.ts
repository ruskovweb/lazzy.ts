export function lastWithIndex<T, R, N>(predicate: (value: T) => boolean, iterator: Iterator<T, R, N>): [T, number] | undefined {
    let counter = 0;
    let result: [T, number] | undefined;
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value)) {
            result = [x.value, counter];
        }
        counter++;
        x = iterator.next();
    }
    return result;
}
