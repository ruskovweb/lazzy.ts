export const InvalidArgumentsMessage = "Invalid arguments.";

export const self = <T>(it: T): T => it;
export const notUndefined = (it: unknown): boolean => it !== undefined;
export const notNull = (it: unknown): boolean => it !== null;
export const notNullish = (it: unknown): boolean => it != null;

export type Primitive = string | number | boolean;

const primitive: readonly string[] = ["string", "number", "boolean"] as const;
function isPrimitive(value: unknown): value is boolean | number | string {
    return primitive.includes(typeof value);
}

export function nonNullable<T>(value: T): NonNullable<T> {
    assertNonNullable(value);
    return value;
}

export function assertNonNullable<T>(value: T): asserts value is NonNullable<T> {
    if (value == null) {
        throw new Error();
    }
}

export type Depth = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type FlatArray<Arr, Depth extends number> = {
    done: Arr;
    recur: Arr extends ReadonlyArray<infer InnerArr> ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19][Depth]> : Arr;
}[Depth extends 0 ? "done" : "recur"];

export const isIterable = (it: unknown): boolean => {
    const type = typeof it;
    return type === "string" || (it != null && (typeof it === "object" || typeof it === "function") && typeof Reflect.get(nonNullable(it), Symbol.iterator) === "function");
};

export function getNumericSelector<T>(value: T, ...select: T extends number ? [undefined?] : [(value: T) => number]): ((v: T) => number) | ((v: number) => number) {
    if (typeof value === "number") {
        return (v: number): number => v;
    } else if (select[0] !== undefined) {
        return select[0];
    }

    throw new TypeError(InvalidArgumentsMessage);
}

export function getPrimitiveSelector<T>(value: T, ...select: T extends Primitive ? [undefined?] : [(value: T) => Primitive]): ((v: T) => Primitive) | ((v: Primitive) => Primitive) {
    if (isPrimitive(value)) {
        return (v: Primitive): Primitive => v;
    } else if (select[0] !== undefined) {
        return select[0];
    }

    throw new TypeError(InvalidArgumentsMessage);
}
