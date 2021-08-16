import { getPrimitiveSelector, Primitive } from "../common/helpers";

export function join<T, R, N>(iterator: Iterator<T, R, N>, separator: string, ...select: T extends Primitive ? [undefined?] : [(value: T) => Primitive]): string {
    let x = iterator.next();
    let sb = "";
    const selector = getPrimitiveSelector(x.value, ...select);

    while (x.done !== true) {
        sb += selector(x.value as T & string).toString();
        x = iterator.next();
        if (x.done !== true) {
            sb += separator;
        }
    }

    return sb;
}
