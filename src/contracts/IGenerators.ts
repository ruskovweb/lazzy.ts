import { RangeParams } from "../generators/range";
import { ILazyCollection } from "./ILazyCollection";

export interface IGenerators {
    range(parameters?: Partial<RangeParams>): ILazyCollection<number, undefined, undefined>;
    randomInt(lessThan: number): ILazyCollection<number, undefined, undefined>;
    circular<T>(iterable: Iterable<T>): ILazyCollection<T, undefined, undefined>;
}
