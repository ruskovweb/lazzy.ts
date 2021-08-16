import { getNumericSelector } from "../common/helpers";

export function average<T, R, N>(iterator: Iterator<T, R, N>, ...select: T extends number ? [undefined?] : [(value: T) => number]): number {
    let x = iterator.next();
    if (x.done === true) {
        return 0;
    }
    const selector = getNumericSelector(x.value, ...select);

    let c = 0;
    let totalSum = 0;
    while (x.done !== true) {
        totalSum += selector(x.value as T & number);
        x = iterator.next();
        c++;
    }

    return totalSum / c;
}
