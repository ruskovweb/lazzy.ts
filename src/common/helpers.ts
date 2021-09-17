export const InvalidArgumentsMessage = "Invalid arguments.";

export type Primitive = string | number | boolean;
export function isPrimitive(value: unknown): value is boolean | number | string {
    return ["string", "number", "boolean"].includes(typeof value);
}

export type Enumerate<N extends number, RESULT extends number[] = []> = 
    RESULT["length"] extends N
    ? RESULT[number]
    : Enumerate<N, [...RESULT, RESULT["length"]]>;

export type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>;

export type Depth = Enumerate<21>;
export type FlatArray<Arr, Depth extends number> = {
    done: Arr;
    recur: Arr extends ReadonlyArray<infer InnerArr> ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19][Depth]> : Arr;
}[Depth extends 0 ? "done" : "recur"];

export type Select<T, U> = T extends U ? [] : Extract<keyof T, "toString"> extends never ? [(value: T) => U] : [] | [(value: T) => U];

export type Comparer<T> = (left: T, right: T) => number;
export type OptionalComparer<T, U = T> = T extends Primitive ? [Comparer<U>?] : [Comparer<U>];

export type PromiseValue<T> = T extends Promise<infer U> ? U : T;
export type AsPromise<T> = T extends Promise<any> ? T : Promise<T>;

export type PromiseOrValue<T> = PromiseValue<T> | AsPromise<T>; 

export type IterableValue<T> = T extends Iterable<infer U> ? U : T;
export type AnyIterableValue<T> = T extends Iterable<infer U> | AsyncIterable<infer U> ? U : T;

export const isIterable = (it: unknown): boolean => {
    const type = typeof it;
    return type === "string" || 
        ((typeof it === "object" || typeof it === "function") && it != null && typeof Reflect.get(it, Symbol.iterator) === "function");
};

export function getNumericSelector<T>(value: T, ...select: T extends number ? [] : [(value: T) => number]): ((v: T) => number) | ((v: number) => number) {
    if (typeof value === "number") {
        return (v: number): number => v;
    } else if (select[0] !== undefined) {
        return select[0];
    }

    throw new TypeError(InvalidArgumentsMessage);
}
