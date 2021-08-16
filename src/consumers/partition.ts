export function partition<T, R, N>(predicate: (value: T) => boolean, iterator: Iterator<T, R, N>): [T[], T[]] {
    const result: [T[], T[]] = [[], []];
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value)) {
            result[0].push(x.value);
        } else {
            result[1].push(x.value);
        }
        x = iterator.next();
    }
    return result;
}
