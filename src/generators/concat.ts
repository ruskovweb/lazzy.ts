export function* concat<T>(...iterators: Array<Iterator<T, unknown, unknown>>): Generator<T, void, undefined> {
    for (const g of iterators) {
        let x = g.next();
        while (x.done !== true) {
            yield x.value;
            x = g.next();
        }
    }
}
