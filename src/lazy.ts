import { chain } from "./chain";
import { ILazy, ILazyCollection } from "./contracts";
import * as λ from "./generators";

const isIterable = <U, T extends Iterable<U>>(it: T | unknown): it is T extends Iterable<infer U> ? Iterable<U> : Iterable<unknown> => {
    const type = typeof it;
    return type === "string" || (it != null && (typeof it === "object" || typeof it === "function") && typeof Reflect.get(it as object, Symbol.iterator) === "function");
};

const Lazy: ILazy = {
    from: <T, R, N>(source: Iterable<T> | Iterator<T, R, N>): ILazyCollection<T, R | undefined, N | undefined> => {
        if (isIterable(source)) {
            return chain(λ.toLazy(source));
        }
        return chain(source);
    },
    generate: <T, R, N> (func: () => T): ILazyCollection<T, R | undefined, N> => chain(λ.generate(func)),
    range: (parameters?: Partial<λ.RangeParams>): ILazyCollection<number, undefined, undefined> => chain(λ.range(parameters)),
    circular: <T>(iterable: Iterable<T>): ILazyCollection<T, undefined, undefined> => chain(λ.circular(iterable)),
    randomFrom: <T>(array: T[]): ILazyCollection<T, never, never> => chain(λ.randomFrom(array)),
    randomInt: (lessThan: number): ILazyCollection<number, undefined, undefined> => chain(λ.randomInt(lessThan)),
};

export default Lazy;
