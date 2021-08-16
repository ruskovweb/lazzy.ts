import { toLazy } from ".";
import { chain, generators } from "./chain";
import { isIterableTypeGuard } from "./common";
import { ILazy, ILazyCollection } from "./contracts";

const Lazy: ILazy = {
    from: <T, R, N>(source: Iterable<T> | Iterator<T, R, N>): ILazyCollection<T, R | undefined, N | undefined> => {
        if (isIterableTypeGuard(source)) {
            return chain(toLazy(source));
        }
        return chain(source);
    },
    generators,
};

export default Lazy;

export * from "./consumers";
export * from "./generators";
