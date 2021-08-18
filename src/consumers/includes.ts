export function includes<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T) => boolean): boolean {
    while (true) {
        const x = iterator.next();
        if (x.done === true) {
            return false;
        } else if (predicate(x.value)) {
            return true;
        }
    }
}
