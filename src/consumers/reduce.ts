export function reduce<T, R, N, V>(iterator: Iterator<T, R, N>, reducer: (value: T, accumulator: V) => V, initial: V): V {
    let result = initial;
    let x = iterator.next();
    while (x.done !== true) {
        result = reducer(x.value, result);
        x = iterator.next();
    }
    return result;
}
