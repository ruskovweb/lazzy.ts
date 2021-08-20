import { RangeParams } from "..";
import { ILazyCollection } from "./ILazyCollection";

export interface ILazy {
    from: <T, R, N>(source: Iterable<T> | Iterator<T, R, N>) => ILazyCollection<T, R | undefined, N | undefined>;
    generate: <T> (func: () => T) => ILazyCollection<T, undefined, undefined>;
    range(parameters?: Partial<RangeParams>): ILazyCollection<number, undefined, undefined>;
    circular<T>(iterable: Iterable<T>): ILazyCollection<T, undefined, undefined>;
    randomFrom<T>(array: T[]): ILazyCollection<T, never, never>;
    randomInt(lessThan: number): ILazyCollection<number, undefined, undefined>;
}
