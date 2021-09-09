import { getNumericSelector } from "../common/helpers";

export function product<T, R, N>(iterator: Iterator<T, R, N>, ...select: T extends number ? [] : [(value: T) => number]): number {
    let x = iterator.next();
    if (x.done === true) {
        return 0;
    }

    const selector = getNumericSelector(x.value, ...select);

    let p = 1;
    while (x.done !== true) {
        p *= selector(x.value as T & number);
        x = iterator.next();
    }

    return p;
}

export async function productAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, ...select: T extends number ? [] : [(value: T) => number]): Promise<number> {
    let x = await iterator.next();
    if (x.done === true) {
        return 0;
    }

    const selector = getNumericSelector(x.value, ...select);

    let p = 1;
    while (x.done !== true) {
        p *= selector(x.value as T & number);
        x = await iterator.next();
    }

    return p;
}
