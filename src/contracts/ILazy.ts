import { IGenerators } from "./IGenerators";
import { ILazyCollection } from "./ILazyCollection";

export interface ILazy {
    from: <T, R, N>(source: Iterable<T> | Iterator<T, R, N>) => ILazyCollection<T, R | undefined, N | undefined>;
    generators: IGenerators;
}
