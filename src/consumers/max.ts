import { getNumericSelector } from "../common/helpers";

export function max<T, R, N>(iterator: Iterator<T, R, N>, ...select: T extends number ? [] : [(value: T) => number]): T | undefined {
    let x = iterator.next();
    if (x.done === true) {
        return undefined;
    }

    const selector = getNumericSelector(x.value, ...select);
    let result = x.value;
    let maxValue = selector(x.value as T & number);
    
    x = iterator.next();
    while (x.done !== true) {
        const value = selector(x.value as T & number);
        if (value > maxValue) {
            maxValue = value;
            result = x.value;
        }
        x = iterator.next();
    }

    return result;
}

export async function maxAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, ...select: T extends number ? [] : [(value: T) => number]): Promise<T | undefined> {
    let x = await iterator.next();
    if (x.done === true) {
        return undefined;
    }

    const selector = getNumericSelector(x.value, ...select);
    let result = x.value;
    let maxValue = selector(x.value as T & number);
    
    x = await iterator.next();
    while (x.done !== true) {
        const value = selector(x.value as T & number);
        if (value > maxValue) {
            maxValue = value;
            result = x.value;
        }
        x = await iterator.next();
    }

    return result;
}
