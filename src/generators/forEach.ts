export function* forEach<T, R, N>(fun: (v: T, i: number) => void, iterator: Iterator<T, R, N>): Generator<T, R | undefined, undefined> {
    let index = 0;
    let x = iterator.next();
    while (x.done !== true) {
        fun(x.value, index);
        yield x.value;
        index++;
        x = iterator.next();
    }
    return x.value;
}
