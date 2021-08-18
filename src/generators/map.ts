export function* map<T, R, N, U>(iterator: Iterator<T, R, N>, transformer: (v: T) => U): Generator<U, R | undefined, undefined> {
    while (true) {
        const x = iterator.next();
        if (x.done === true) {
            return x.value;
        } else {
            yield transformer(x.value);
        }
    }
}
