export function includes<T, R, N>(predicate: (value: T) => boolean, iterator: Iterator<T, R, N>): boolean {
    while (true) {
        const x = iterator.next();
        if (x.done === true) {
            return false;
        } else if (predicate(x.value)) {
            return true;
        }
    }
}
