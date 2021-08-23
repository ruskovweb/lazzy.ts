import { ILazyCollection } from "./ILazyCollection";
import { RandomParams, RangeParams } from "..";

export interface ILazy {
    circular<T>(iterable: Iterable<T>): ILazyCollection<T, undefined, undefined>;
    from: <T, R, N>(source: Iterable<T> | Iterator<T, R, N>) => ILazyCollection<T, R | undefined, N | undefined>;
    generate: <T> (func: () => T) => ILazyCollection<T, undefined, undefined>;
    random(parameters?: Partial<RandomParams>): ILazyCollection<number, undefined, undefined>;
    range(parameters?: Partial<RangeParams>): ILazyCollection<number, undefined, undefined>;
}
