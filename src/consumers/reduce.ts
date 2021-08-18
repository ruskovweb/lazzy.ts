export function reduce<T, R, N, U>(iterator: Iterator<T, R, N>, reducer: (value: T, accumulator: U) => U, initial: U): U {
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
