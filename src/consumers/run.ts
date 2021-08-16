export function run<T, R, N>(iterator: Iterator<T, R, N>): R {
    while (true) {
        const r = iterator.next();
        if (r.done === true) {
            return r.value;
        }
    }
}
