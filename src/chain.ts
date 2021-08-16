import { Depth, Primitive } from "./common";
import { IGenerators, ILazyCollection } from "./contracts";
import * as λ from "./generators";
import * as γ from "./consumers";

export function chain<T, R, N>(iterator: Iterator<T, R, N>): ILazyCollection<T, R, N> {
    return {
        [Symbol.iterator]: (): Iterator<T, R, N> => iterator,

        //#region Providers

        /**
         * @description Use this function only in for-of loops, otherwise you risk falling into an infinite loop.
         * Avoid all other consumers like Array.from(), new Set(), etc.
         */
        *lazyChunk(size: number): Generator<ILazyCollection<T, void, unknown>, R, N> {
            const it = λ.lazyChunk(size, iterator);
            let x = it.next();
            while (x.done !== true) {
                yield chain(x.value);
                x = it.next();
            }
            return x.value;
        },
        chunk: (size: number): ILazyCollection<T[], R, N> => chain(λ.chunk(size, iterator)),
        concat: (...iterators: Array<Iterator<T, R, N>>): ILazyCollection<T, undefined, undefined> => chain(λ.concat(iterator, ...iterators)),
        append: (...iterables: Array<Iterable<T>>): ILazyCollection<T, R, N> => chain(λ.append(iterator, ...iterables)),
        prepend: (...iterables: Array<Iterable<T>>): ILazyCollection<T, R, N> => chain(λ.prepend(iterator, ...iterables)),
        distinct: (...select: T extends Primitive ? [undefined?] : [(value: T) => Primitive]): ILazyCollection<T, R, undefined> => chain(λ.distinct(iterator, ...select)),
        filter: (predicate: (value: T) => boolean): ILazyCollection<T, R | undefined, undefined> => chain(λ.filter(predicate, iterator)),
        filterWithIndex: (predicate: (value: T) => boolean): ILazyCollection<[T, number], R | undefined, undefined> => chain(λ.filterWithIndex(predicate, iterator)),
        take: (c: number): ILazyCollection<T, R | undefined, undefined> => chain(λ.take(c, iterator)),
        takeWhile: (predicate: (value: T) => boolean): ILazyCollection<T, number, undefined> => chain(λ.takeWhile(predicate, iterator)),
        skip: (c: number): ILazyCollection<T, R | undefined, undefined> => chain(λ.skip(c, iterator)),
        skipWhile: (predicate: (value: T) => boolean): ILazyCollection<T, undefined, undefined> => chain(λ.skipWhile(predicate, iterator)),
        indices: (predicate: (value: T) => boolean): ILazyCollection<number, R, N> => chain(λ.indices(predicate, iterator)),
        map: <U>(transformer: (v: T) => U): ILazyCollection<U, R | undefined, undefined> => chain(λ.map(transformer, iterator)),
        repeat: (c: number): ILazyCollection<T, R | undefined, undefined> => chain(λ.repeat(c, iterator)),
        forEach: (fun: (v: T, i: number) => void): ILazyCollection<T, R | undefined, undefined> => chain(λ.forEach(fun, iterator)),
        pair: (): ILazyCollection<[T, T], R, N> => chain(λ.pair(iterator)),
        spread: (): ILazyCollection<T extends Iterable<infer U> ? U : T, R, undefined> => chain(λ.spread(iterator)),
        zip: <T2, TResult>(iterator2: Iterator<T2, R, N>, resultSelector: (first: T, second: T2) => TResult): ILazyCollection<TResult, R | undefined, N> =>
            chain(λ.zip(iterator, iterator2, resultSelector)),
        feed: <R2, V>(into: Iterator<V, R2, T>): ILazyCollection<V, undefined, undefined> => chain(λ.feed(into, iterator)),
        intercept: <C>(interceptors: λ.Interceptors<C, T, R>, context: C): ILazyCollection<T, R, N> => chain(λ.intercept(iterator, interceptors, context)),
        flat: <D extends Depth = 20>(depth: D = 20 as D): ILazyCollection<FlatArray<T, D>, R, N> => chain(λ.flat(iterator, depth)),
        flatMap: <V, D extends Depth = 20>(transformer: (currentValue: T, index: number) => V, depth: D = 20 as D): ILazyCollection<FlatArray<V, D>, R, N> =>
            chain(λ.flatMap(iterator, transformer, depth)),
        groupBy: <TKey, TElement, TResult>(
            keySelector: (v: T) => TKey,
            elementSelector: (v: T) => TElement,
            resultSelector: (key: TKey, elements: TElement[]) => TResult
        ): ILazyCollection<TResult, R, N> => chain(λ.groupBy(iterator, keySelector, elementSelector, resultSelector)),
        //#endregion

        //#region Consumers
        first: (predicate: (value: T) => boolean): T | undefined => γ.first(predicate, iterator),
        firstWithIndex: (predicate: (value: T) => boolean): [T, number] | undefined => γ.firstWithIndex(predicate, iterator),
        last: (predicate: (value: T) => boolean): T | undefined => γ.last(predicate, iterator),
        lastWithIndex: (predicate: (value: T) => boolean): [T, number] | undefined => γ.lastWithIndex(predicate, iterator),
        indexOf: (predicate: (value: T) => boolean): number => γ.indexOf(predicate, iterator),
        lastIndexOf: (predicate: (value: T) => boolean): number => γ.lastIndexOf(predicate, iterator),
        includes: (predicate: (value: T) => boolean): boolean => γ.includes(predicate, iterator),
        partition: (predicate: (value: T) => boolean): [T[], T[]] => γ.partition(predicate, iterator),
        product: (...select: T extends number ? [undefined?] : [(value: T) => number]): number => γ.product(iterator, ...select),
        sum: (...select: T extends number ? [undefined?] : [(value: T) => number]): number => γ.sum(iterator, ...select),
        count: (): number => γ.count(iterator),
        reduce: <U>(fun: (value: T, accumulator: U) => U, initial: U): U => γ.reduce(fun, initial, iterator),
        uppend: (array: T[], equals: (oldElement: T, newElement: T) => boolean): T[] => γ.uppend(array, equals, iterator),
        run: (): R => γ.run(iterator),
        toIterator: (): Iterator<T, R, N> => iterator,
        toArray: (): T[] => γ.toArray(iterator),
        toSet: (): Set<T> => γ.toSet(iterator),
        toWeakSet: <K extends object>(...select: T extends object ? [undefined?] : [(value: T) => K]): WeakSet<K> => γ.toWeakSet(iterator, ...select),
        toMap: <K, V>(select: (value: T) => [K, V]): Map<K, V> => γ.toMap(select, iterator),
        toWeakMap: <K extends object, V>(select: (value: T) => [K, V]): WeakMap<K, V> => γ.toWeakMap(select, iterator),
        min: (...select: T extends number ? [undefined?] : [(value: T) => number]): number => γ.min(iterator, ...select),
        max: (...select: T extends number ? [undefined?] : [(value: T) => number]): number => γ.max(iterator, ...select),
        join: (separator: string, ...select: T extends Primitive ? [undefined?] : [(value: T) => Primitive]): string => γ.join(iterator, separator, ...select),
        //#endregion
    };
}

export const generators: IGenerators = {
    range: (parameters?: Partial<λ.RangeParams>): ILazyCollection<number, undefined, undefined> => chain(λ.range(parameters)),
    randomInt: (lessThan: number): ILazyCollection<number, undefined, undefined> => chain(λ.randomInt(lessThan)),
    circular: <T>(iterable: Iterable<T>): ILazyCollection<T, undefined, undefined> => chain(λ.circular(iterable)),
    accumulate: (initial?: number): Generator<number, undefined, number> => λ.accumulate(initial),
};
