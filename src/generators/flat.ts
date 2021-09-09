import { Depth, FlatArray } from "../common/helpers";

export function* flat<T, R, N, D extends Depth = 20>(iterator: Iterator<T, R, N>, depth: D = 20 as D): Generator<FlatArray<T, D>, R, undefined> {
    let x = iterator.next();
    while (x.done !== true) {
        if (Array.isArray(x.value) && depth > 0) {
            for (const value of flat((x.value as T[])[Symbol.iterator](), (depth - 1) as D)) {
                yield value;
            }
        } else {
            yield x.value as FlatArray<T, D>;
        }
        x = iterator.next();
    }

    return x.value;
}

export async function* flatAsync<T, R, N, D extends Depth = 20>(iterator: AsyncIterator<T, R, N>, depth: D = 20 as D): AsyncGenerator<FlatArray<T, D>, R, undefined> {
    let x = await iterator.next();
    while (x.done !== true) {
        if (Array.isArray(x.value) && depth > 0) {
            for (const value of flat((x.value as T[])[Symbol.iterator](), (depth - 1) as D)) {
                yield value;
            }
        } else {
            yield x.value as FlatArray<T, D>;
        }
        x = await iterator.next();
    }

    return x.value;
}
