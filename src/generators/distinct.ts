import { getPrimitiveSelector, Primitive } from "../common/helpers";

export function* distinct<T, R, N>(iterator: Iterator<T, R, N>, ...select: T extends Primitive ? [undefined?] : [(value: T) => Primitive]): Generator<T, R, undefined> {
    let x = iterator.next();
    if (x.done === true) {
        return x.value;
    }

    const selector = getPrimitiveSelector(x.value, ...select);
    const already = new Set<Primitive>();
    while (x.done !== true) {
        const value = selector(x.value as Primitive & T);
        if (!already.has(value)) {
            already.add(value);
            yield x.value;
        }

        x = iterator.next();
    }
    return x.value;
}
