import { InvalidArgumentsMessage, isPrimitive, Primitive, Select } from "../common";

type ReturnType<T> = ((value: T) => Primitive) | ((value: Primitive) => Primitive);

function getPrimitiveSelector<T>(value: T, ...select: Select<T, Primitive>): ReturnType<T> {
    if (isPrimitive(value)) {
        return (v: Primitive): Primitive => v;
    } 
    
    if (select[0] !== undefined) {
        return select[0];
    }

    if ((value as any).toString !== Object.prototype.toString) {
        return (v: Primitive): Primitive => v.toString();
    }

    throw new TypeError(InvalidArgumentsMessage);
}

export function join<T, R, N>(iterator: Iterator<T, R, N>, separator: string, ...select: Select<T, Primitive>): string {
    let result = "";
    let x = iterator.next();
    
    const selector = getPrimitiveSelector(x.value, ...select);

    while (x.done !== true) {
        result += selector(x.value as T & string);
        x = iterator.next();
        if (x.done !== true) {
            result += separator;
        }
    }

    return result;
}
