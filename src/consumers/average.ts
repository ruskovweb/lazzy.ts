import { getNumericSelector } from "../common/helpers";

export function average<T, R, N>(iterator: Iterator<T, R, N>, ...select: T extends number ? [] : [(value: T) => number]): number {
    let x = iterator.next();
    if (x.done === true) {
        return 0;
    }
    const selector = getNumericSelector(x.value, ...select);

    let count = 0;
    let totalSum = 0;
    while (x.done !== true) {
        totalSum += selector(x.value as T & number);
        x = iterator.next();
        count++;
    }

    return totalSum / count;
}

export async function averageAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, ...select: T extends number ? [] : [(value: T) => number]): Promise<number> {
    let x = await iterator.next();
    if (x.done === true) {
        return 0;
    }
    const selector = getNumericSelector(x.value, ...select);

    let count = 0;
    let totalSum = 0;
    while (x.done !== true) {
        totalSum += selector(x.value as T & number);
        x = await iterator.next();
        count++;
    }

    return totalSum / count;
}
