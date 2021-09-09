import { ILazyCollection, ILazyCollectionAsync } from ".";
import { RandomParams, RangeParams } from "..";

export interface ILazy {
    circular<T>(iterable: Iterable<T>): ILazyCollection<T, void, undefined>;
    from: <T, R, N>(source: Iterable<T> | Iterator<T, R, N>) => ILazyCollection<T, R | void, N | undefined>;
    fromAsync: <T, R, N>(source: AsyncIterable<T> | AsyncIterator<T, R, N>) => ILazyCollectionAsync<T, R | void, N | undefined>;
    fibonacci: (minimum?: number) => ILazyCollection<number, void, number>;
    generate: <T> (func: () => T) => ILazyCollection<T, void, undefined>;
    generateAsync: <T> (func: () => T | Promise<T>) => ILazyCollectionAsync<T, void, undefined>;
    prime(minimum?: number): ILazyCollection<number, void, number>;
    random(parameters?: Partial<RandomParams>): ILazyCollection<number, void, undefined>;
    randomFrom<T>(array: T[]): ILazyCollection<T, void, undefined>;
    range(parameters?: Partial<RangeParams>): ILazyCollection<number, void, undefined>;
}
