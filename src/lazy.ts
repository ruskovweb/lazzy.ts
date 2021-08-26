import { chain } from "./chain";
import { ILazy, ILazyCollection } from "./contracts";
import * as λ from "./generators";

const isIterable = <U, T extends Iterable<U>>(it: T | unknown): it is T extends Iterable<infer U> ? Iterable<U> : Iterable<unknown> => {
    const type = typeof it;
    return type === "string" || (it != null && (typeof it === "object" || typeof it === "function") && typeof Reflect.get(it as object, Symbol.iterator) === "function");
};

const Lazy: ILazy = {
    circular: <T>(iterable: Iterable<T>): ILazyCollection<T, undefined, undefined> => chain(λ.circular(iterable)),
    from: <T, R, N>(source: Iterable<T> | Iterator<T, R, N>): ILazyCollection<T, R | undefined, N | undefined> => {
        return isIterable(source) ? chain(λ.toLazy(source)) : chain(source);
    },
    fibonacci: (minimum?: number): ILazyCollection<number, void, number> => chain(λ.fibonacci(minimum)),
    generate: <T, R, N> (func: () => T): ILazyCollection<T, R | undefined, N> => chain(λ.generate(func)),
    prime: (minimum?: number): ILazyCollection<number, void, number> => chain(λ.prime(minimum)),
    random: (parameters?: Partial<λ.RandomParams>): ILazyCollection<number, undefined, undefined> => chain(λ.random(parameters)),
    range: (parameters?: Partial<λ.RangeParams>): ILazyCollection<number, undefined, undefined> => chain(λ.range(parameters)),
};

export default Lazy;
