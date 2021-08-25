import { Depth, Primitive, Select, FlatArray } from "./common";
import { ILazyCollection } from "./contracts";
import * as λ from "./generators";
import * as γ from "./consumers";

export function chain<T, R, N>(source: Iterator<T, R, N>): ILazyCollection<T, R, N> {
    return {
        [Symbol.iterator]: (): Iterator<T, R, N> => source,
        
        //#region Generators
        append: (...iterables: Array<Iterable<T>>): ILazyCollection<T, R, N> => chain(λ.append(source, ...iterables)),
        at: (index: number) => chain(λ.at(source, index)),
        chunk: (size: number): ILazyCollection<T[], R, N> => chain(λ.chunk(source, size)),
        concat: (...iterators: Array<Iterator<T, R, N>>): ILazyCollection<T, undefined, undefined> => chain(λ.concat(source, ...iterators)),
        distinct: (...select: T extends Primitive ? [undefined?] : [(value: T) => Primitive]): ILazyCollection<T, R, undefined> => chain(λ.distinct(source, ...select)),
        feed: <R2, V>(into: Iterator<V, R2, T>): ILazyCollection<V, undefined, undefined> => chain(λ.feed(source, into)),
        filter: (predicate: (value: T) => boolean): ILazyCollection<T, R | undefined, undefined> => chain(λ.filter(source, predicate)),
        filterWithIndex: (predicate: (value: T) => boolean): ILazyCollection<[T, number], R | undefined, undefined> => chain(λ.filterWithIndex(source, predicate)),
        flat: <D extends Depth = 20>(depth: D = 20 as D): ILazyCollection<FlatArray<T, D>, R, N> => chain(λ.flat(source, depth)),
        flatMap: <V, D extends Depth = 20>(transformer: (currentValue: T, index: number) => V, depth: D = 20 as D): ILazyCollection<FlatArray<V, D>, R, N> =>
            chain(λ.flatMap(source, transformer, depth)),
        forEach: (fun: (v: T, i: number) => void): ILazyCollection<T, R | undefined, undefined> => chain(λ.forEach(source, fun)),
        groupBy: <TKey, TElement, TResult>(
            keySelector: (v: T) => TKey,
            elementSelector: (v: T) => TElement,
            resultSelector: (key: TKey, elements: TElement[]) => TResult
        ): ILazyCollection<TResult, R, N> => chain(λ.groupBy(source, keySelector, elementSelector, resultSelector)),
        indices: (predicate: (value: T) => boolean): ILazyCollection<number, R, N> => chain(λ.indices(source, predicate)),

        /**
         * @description Use this function only in for-of loops, otherwise you risk falling into an infinite loop.
         * Avoid all other consumers like Array.from(), new Set(), etc.
         */
        *lazyChunk(size: number): Generator<ILazyCollection<T, void, unknown>, R, N> {
            const it = λ.lazyChunk(source, size);
            let x = it.next();
            while (x.done !== true) {
                yield chain(x.value);
                x = it.next();
            }
            return x.value;
        },
        map: <U>(transformer: (v: T) => U): ILazyCollection<U, R | undefined, undefined> => chain(λ.map(source, transformer)),
        prepend: (...iterables: Array<Iterable<T>>): ILazyCollection<T, R, N> => chain(λ.prepend(source, ...iterables)),
        repeat: (c: number): ILazyCollection<T, R | undefined, undefined> => chain(λ.repeat(source, c)),
        skip: (c: number): ILazyCollection<T, R, undefined> => chain(λ.skip(source, c)),
        skipWhile: (predicate: (value: T) => boolean): ILazyCollection<T, R, undefined> => chain(λ.skipWhile(source, predicate)),
        spread: (): ILazyCollection<T extends Iterable<infer U> ? U : T, R, undefined> => chain(λ.spread(source)),
        take: (c: number): ILazyCollection<T, R | undefined, undefined> => chain(λ.take(source, c)),
        takeWhile: (predicate: (value: T) => boolean): ILazyCollection<T, number, undefined> => chain(λ.takeWhile(source, predicate)),
        zip: <T2, TResult>(iterator2: Iterator<T2, R, N>, resultSelector: (first: T, second: T2) => TResult): ILazyCollection<TResult, R | undefined, N> =>
            chain(λ.zip(source, iterator2, resultSelector)),
        //#endregion

        //#region Consumers
        average: (...select: T extends number ? [undefined?] : [(value: T) => number]): number => γ.average(source, ...select),
        count: (): number => γ.count(source),
        every: (predicate: (value: T, index: number) => boolean) => γ.every(source, predicate),
        first: (predicate?: (value: T) => boolean): T | undefined => γ.first(source, predicate),
        firstWithIndex: (predicate: (value: T) => boolean): [T | undefined, number] => γ.firstWithIndex(source, predicate),
        includes: (predicate: (value: T) => boolean): boolean => γ.includes(source, predicate),
        indexOf: (predicate: (value: T) => boolean): number => γ.indexOf(source, predicate),
        join: (separator: string, ...select: Select<T, Primitive>): string => γ.join(source, separator, ...select),
        last: (predicate?: (value: T) => boolean): T | undefined => γ.last(source, predicate),
        lastIndexOf: (predicate: (value: T) => boolean): number => γ.lastIndexOf(source, predicate),
        lastWithIndex: (predicate: (value: T) => boolean): [T | undefined, number] => γ.lastWithIndex(source, predicate),
        max: (...select: T extends number ? [undefined?] : [(value: T) => number]): number => γ.max(source, ...select),
        min: (...select: T extends number ? [undefined?] : [(value: T) => number]): number => γ.min(source, ...select),
        partition: (predicate: (value: T) => boolean): [T[], T[]] => γ.partition(source, predicate),
        product: (...select: T extends number ? [undefined?] : [(value: T) => number]): number => γ.product(source, ...select),
        reduce: <U>(fun: (value: T, accumulator: U) => U, initial: U): U => γ.reduce(source, fun, initial),
        run: (): R => γ.run(source),
        sum: (...select: T extends number ? [undefined?] : [(value: T) => number]): number => γ.sum(source, ...select),
        toArray: (): T[] => γ.toArray(source),
        toIterator: (): Iterator<T, R, N> => source,
        toMap: <K, V>(select: (value: T) => [K, V]): Map<K, V> => γ.toMap(source, select),
        toSet: (): Set<T> => γ.toSet(source),
        toWeakMap: <K extends object, V>(select: (value: T) => [K, V]): WeakMap<K, V> => γ.toWeakMap(source, select),
        toWeakSet: <K extends object>(...select: T extends object ? [undefined?] : [(value: T) => K]): WeakSet<K> => γ.toWeakSet(source, ...select),
        uppend: (array: T[], equals: (oldElement: T, newElement: T) => boolean): T[] => γ.uppend(source, array, equals),
        //#endregion
    };
}
