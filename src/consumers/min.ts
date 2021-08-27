import { getNumericSelector } from "../common/helpers";

export function min<T, R, N>(iterator: Iterator<T, R, N>, ...select: T extends number ? [] : [(value: T) => number]): number {
    let x = iterator.next();
    if (x.done === true) {
        return 0;
    }

    const selector = getNumericSelector(x.value, ...select);
    let minValue = selector(x.value as T & number);
    while (x.done !== true) {
        const value = selector(x.value as T & number);
        if (value < minValue) {
            minValue = value;
        }
        x = iterator.next();
    }

    return minValue;
}
