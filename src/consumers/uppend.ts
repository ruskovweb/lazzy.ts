export function uppend<T, R, N>(source: Iterator<T, R, N>, newValues: Iterator<T, R, N>, predicate: (oldElement: T, newElement: T) => boolean): T[] {
    const result: T[] = [];

    let x = source.next();
    while (x.done !== true) {
        result.push(x.value);
        x = source.next();
    }

    let x2 = newValues.next();
    while (x2.done !== true) {
        const val = x2.value;
        const index = result.findIndex((v) => predicate(v, val));
        if (index < 0) {
            result.push(x2.value);
        } else {
            result[index] = x2.value;
        }
        x2 = newValues.next();
    }
    return result;
}
