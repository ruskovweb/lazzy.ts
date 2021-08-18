export function uppend<T, R, N>(iterator: Iterator<T, R, N>, array: T[], predicate: (oldElement: T, newElement: T) => boolean): T[] {
    const duplicate = [...array];
    let x = iterator.next();
    while (x.done !== true) {
        const val = x.value;
        const index = array.findIndex((value) => predicate(value, val));
        if (index === -1) {
            duplicate.push(x.value);
        } else {
            duplicate[index] = x.value;
        }
        x = iterator.next();
    }
    return duplicate;
}
