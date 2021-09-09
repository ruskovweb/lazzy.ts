import { InvalidArgumentsMessage } from "../common";

export function toWeakSet<T, R, N, K extends object>(iterator: Iterator<T, R, N>, ...select: T extends object ? [] : [(value: T) => K]): WeakSet<K> {
    const result = new WeakSet<K>();
    let x = iterator.next();
    if (x.done === true) {
        return result;
    }

    let selector: (v: T) => K;
    if (typeof x.value === "object") {
        selector = (v: T): K => v as unknown as K;
    } else if (select[0] !== undefined) {
        selector = select[0];
    } else {
        throw new Error(InvalidArgumentsMessage);
    }

    while (x.done !== true) {
        result.add(selector(x.value));
        x = iterator.next();
    }
    return result;
}

export async function toWeakSetAsync<T, R, N, K extends object>(iterator: AsyncIterator<T, R, N>, ...select: T extends object ? [] : [(value: T) => K]): Promise<WeakSet<K>> {
    const result = new WeakSet<K>();
    let x = await iterator.next();
    if (x.done === true) {
        return result;
    }

    let selector: (v: T) => K;
    if (typeof x.value === "object") {
        selector = (v: T): K => v as unknown as K;
    } else if (select[0] !== undefined) {
        selector = select[0];
    } else {
        throw new Error(InvalidArgumentsMessage);
    }

    while (x.done !== true) {
        result.add(selector(x.value));
        x = await iterator.next();
    }
    return result;
}
