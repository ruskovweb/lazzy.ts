export function firstWithIndex<T, R, N>(predicate: (value: T) => boolean, iterator: Iterator<T, R, N>): [T, number] | undefined {
    let counter = 0;
    while (true) {
        const x = iterator.next();
        if (x.done === true) {
            return undefined;
        } else if (predicate(x.value)) {
            return [x.value, counter];
        } else {
            counter++;
        }
    }
}
