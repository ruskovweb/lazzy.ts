export function* concat<T, R, N>(...iterators: Array<Iterator<T, R, N>>): Generator<T, undefined, undefined> {
    for (const g of iterators) {
        let x = g.next();
        while (x.done !== true) {
            yield x.value;
            x = g.next();
        }
    }
    return;
}
