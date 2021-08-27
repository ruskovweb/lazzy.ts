import { getNumericSelector } from "../common/helpers";

export function sum<T, R, N>(iterator: Iterator<T, R, N>, ...select: T extends number ? [] : [(value: T) => number]): number {
    let x = iterator.next();
    if (x.done === true) {
        return 0;
    }

    const selector = getNumericSelector(x.value, ...select);

    let totalSum = 0;
    while (x.done !== true) {
        totalSum += selector(x.value as T & number);
        x = iterator.next();
    }

    return totalSum;
}
