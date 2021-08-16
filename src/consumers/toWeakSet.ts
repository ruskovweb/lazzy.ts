export function toWeakSet<T, R, N, K extends object>(iterator: Iterator<T, R, N>, ...select: T extends object ? [undefined?] : [(value: T) => K]): WeakSet<K> {
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
        throw new Error("Invalid arguments.");
    }

    while (x.done !== true) {
        result.add(selector(x.value));
        x = iterator.next();
    }
    return result;
}
