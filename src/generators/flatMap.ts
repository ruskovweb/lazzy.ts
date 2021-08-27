import { Depth, FlatArray } from "../common/helpers";
import { flat } from "./flat";
import { toLazy } from "./toLazy";

export function* flatMap<T, R, N, V, D extends Depth = 20>(iterator: Iterator<T, R, N>, func: (currentValue: T, index: number) => V, depth: D = 20 as D): Generator<FlatArray<V, D>, R, undefined> {
    depth = depth ?? (20 as D);
    let index = 0;
    let x = iterator.next();
    while (x.done !== true) {
        const result = func(x.value, index);
        if (Array.isArray(result) && depth > 0) {
            for (const value of flat(toLazy(result), (depth - 1) as D)) {
                yield value;
            }
        } else {
            yield result as FlatArray<V, D>;
        }

        x = iterator.next();
        index++;
    }

    return x.value;
}
