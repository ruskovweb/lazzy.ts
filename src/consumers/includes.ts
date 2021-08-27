export function includes<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T) => boolean): boolean {
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value)) {
            return true;
        }
        x = iterator.next();
    }
    return false;
}
