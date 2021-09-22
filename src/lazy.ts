import { Chain, ChainAsync } from "./chain";
import { ILazy, ILazyCollection, ILazyCollectionAsync } from "./contracts";
import * as λ from "./generators";

const isIterable = <U, T extends Iterable<U>>(it: T | unknown): it is T extends Iterable<infer U> ? Iterable<U> : Iterable<unknown> => {
    const type = typeof it;
    return type === "string" || (it != null && (typeof it === "object" || typeof it === "function") && typeof Reflect.get(it as object, Symbol.iterator) === "function");
};

const isIterableAsync = <U, T extends AsyncIterable<U>>(it: T | unknown): it is T extends AsyncIterable<infer U> ? AsyncIterable<U> : AsyncIterable<unknown> => {
    return (it != null && (typeof it === "object" || typeof it === "function") && typeof Reflect.get(it as object, Symbol.asyncIterator) === "function");
};

class Lazy implements ILazy {
    circular<T>(iterable: Iterable<T>): ILazyCollection<T, void, undefined> {
        return new Chain(λ.circular(iterable));
    }

    from<T, R, N>(source: Iterable<T> | Iterator<T, R, N>): ILazyCollection<T, R | void, N | undefined> {
        return isIterable(source) ? new Chain(source[Symbol.iterator]()) : new Chain(source);
    }

    fromAsync<T, R, N>(source: AsyncIterable<T> | AsyncIterator<T, R, N>): ILazyCollectionAsync<T, R | void, N | undefined> {
        return isIterableAsync(source) ? new ChainAsync(source[Symbol.asyncIterator]()) : new ChainAsync(source);
    }

    fibonacci(minimum?: number): ILazyCollection<number, void, number> { 
        return new Chain(λ.fibonacci(minimum));
    }

    generate<T> (func: () => T): ILazyCollection<T, void, undefined> {
        return new Chain(λ.generate(func));
    }

    generateAsync<T>(func: () => T | Promise<T>): ILazyCollectionAsync<T, void, undefined> {
        return new ChainAsync(λ.generateAsync(func))
    }

    prime(minimum?: number): ILazyCollection<number, void, number> {
        return new Chain(λ.prime(minimum));
    }

    random(parameters?: Partial<λ.RandomParams>): ILazyCollection<number, void, undefined> {
        return new Chain(λ.random(parameters));
    }

    randomFrom<T>(array: T[]): ILazyCollection<T, void, undefined> {
        return new Chain(λ.randomFrom(array));
    }

    range(parameters?: Partial<λ.RangeParams>): ILazyCollection<number, void, undefined> {
        return new Chain(λ.range(parameters));
    }
}

const lazy = new Lazy();
export default lazy;