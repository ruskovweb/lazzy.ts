export function* repeat<T, R, N>(number: number, iterator: Iterator<T, R, N>): Generator<T, R | undefined, undefined> {
    if (number < 0) {
        number = 0;
    }

    let x = iterator.next();
    while (x.done !== true) {
        for (let i = 0; i <= number; i++) {
            yield x.value;
        }
        x = iterator.next();
    }
    return x.value;
}
