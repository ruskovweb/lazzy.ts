export function reduce<T, R, N, U>(reducer: (value: T, accumulator: U) => U, initial: U, iterator: Iterator<T, R, N>): U {
    let result = initial;
    while (true) {
        const x = iterator.next();
        if (x.done === true) {
            return result;
        } else {
            result = reducer(x.value, result);
        }
    }
}
