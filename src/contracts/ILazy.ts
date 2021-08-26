import { ILazyCollection } from "./ILazyCollection";
import { RandomParams, RangeParams } from "..";

export interface ILazy {
    circular<T>(iterable: Iterable<T>): ILazyCollection<T, undefined, undefined>;
    from: <T, R, N>(source: Iterable<T> | Iterator<T, R, N>) => ILazyCollection<T, R | undefined, N | undefined>;
    fibonacci: (minimum?: number) => ILazyCollection<number, void, number>;
    generate: <T> (func: () => T) => ILazyCollection<T, undefined, undefined>;
    prime(minimum?: number): ILazyCollection<number, void, number>;
    random(parameters?: Partial<RandomParams>): ILazyCollection<number, undefined, undefined>;
    range(parameters?: Partial<RangeParams>): ILazyCollection<number, undefined, undefined>;
}
