import { InvalidArgumentsMessage, isPrimitive, Primitive, PromiseValue } from "../common/helpers";

export function getPrimitiveSelector<T>(value: T, ...select: T extends Primitive ? [] : [(value: T) => Primitive]) {
    if (isPrimitive(value)) {
        return (v: Primitive): Primitive => v;
    } 
    
    if (select[0] !== undefined) {
        return select[0];
    }

    throw new TypeError(InvalidArgumentsMessage);
}

export function* distinct<T, R, N>(iterator: Iterator<T, R, N>, ...select: T extends Primitive ? [] : [(value: T) => Primitive]): Generator<T, R, undefined> {
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

export async function getPrimitiveSelectorAsync<T>(value: T, ...select: PromiseValue<T> extends Primitive ? [] : [(value: PromiseValue<T>) => Primitive]) {
    if (isPrimitive(await Promise.resolve(value))) {
        return (v: Primitive): Primitive => v;
    }
    
    if (select[0] !== undefined) {
        return select[0];
    }

    throw new TypeError(InvalidArgumentsMessage);
}

export async function* distinctAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, ...select: PromiseValue<T> extends Primitive ? [] : [(value: PromiseValue<T>) => Primitive]): AsyncGenerator<PromiseValue<T>, R, undefined> {
    let x = await iterator.next();
    if (x.done === true) {
        return x.value;
    }

    const selector = await getPrimitiveSelectorAsync(x.value, ...select);
    const already = new Set<Primitive>();
    while (x.done !== true) {
        const value = selector(await Promise.resolve(x.value) as Primitive & PromiseValue<T>);
        if (!already.has(value)) {
            already.add(value);
            yield x.value as PromiseValue<T>;
        }

        x = await iterator.next();
    }

    return x.value;
}
