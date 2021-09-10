import { Depth, OptionalComparer, Primitive, Select, FlatArray, PromiseValue } from "../common";
import { ILazyCollection, ILazyCollectionAsync } from "../contracts";
import * as λ from "../generators";
import * as γ from "../consumers";
import { chain } from ".";

export function chainAsync<T, R, N>(source: AsyncIterator<T, R, N>): ILazyCollectionAsync<T, R, N> {
    return {
        [Symbol.asyncIterator]: (): AsyncIterator<T, R, N> => source,

        //#region Generators
        append: (...iterables: Array<Iterable<T | PromiseValue<T>> | AsyncIterable<T | PromiseValue<T>>>): ILazyCollectionAsync<PromiseValue<T>, R, N> => chainAsync(λ.appendAsync(source, ...iterables)),
        at: (index: number) => chainAsync(λ.atAsync(source, index)),
        balancedChunk: (target: number, ...select: T extends number ? [] : [(value: T) => number]): ILazyCollectionAsync<T[], void, undefined> => chainAsync(λ.balancedChunkAsync(source, target, ...select)),
        chunk: (size: number): ILazyCollectionAsync<T[], R, N> => chainAsync(λ.chunkAsync(source, size)),
        concat: (...iterators: Array<Iterator<T, unknown, unknown> | AsyncIterator<T, unknown, unknown>>): ILazyCollectionAsync<T, void, undefined> => chainAsync(λ.concatAsync(source, ...iterators)),
        custom: <T2, R2, N2>(generator: (iterator: AsyncIterator<T, R, N>) => AsyncGenerator<T2, R2, N2>): ILazyCollectionAsync<T2, R2, N2> => chainAsync(generator(source)),
        distinct: (...select: T extends Primitive ? [] : [(value: T) => Primitive]): ILazyCollectionAsync<T, R, undefined> => chainAsync(λ.distinctAsync(source, ...select)),
        feed: <R2, V>(from: Iterator<V, R2, T> | AsyncIterator<V, R2, T>): ILazyCollectionAsync<V, void, undefined> => chainAsync(λ.feedAsync(source, from)),
        fill: (values: Iterable<T> | AsyncIterable<T>, start?: number, end?: number): ILazyCollectionAsync<T, R, undefined> => chainAsync(λ.fillAsync(source, values, start, end)),
        filter: (predicate: (value: T, index: number) => boolean | Promise<boolean>): ILazyCollectionAsync<T, R, undefined> => chainAsync(λ.filterAsync(source, predicate)),
        filterWithIndex: (predicate: (value: T, index: number) => boolean | Promise<boolean>): ILazyCollectionAsync<[T, number], R, undefined> => chainAsync(λ.filterWithIndexAsync(source, predicate)),
        flat: <D extends Depth = 20>(depth: D = 20 as D): ILazyCollectionAsync<FlatArray<T, D>, R, undefined> => chainAsync(λ.flatAsync(source, depth)),
        flatMap: <V, D extends Depth = 20>(transformer: (currentValue: T, index: number) => V, depth: D = 20 as D): ILazyCollectionAsync<FlatArray<V, D>, R, undefined> =>
            chainAsync(λ.flatMapAsync(source, transformer, depth)),
        forEach: (fun: (v: T, i: number) => void): ILazyCollectionAsync<T, R, undefined> => chainAsync(λ.forEachAsync(source, fun)),
        groupBy: <TKey, TElement, TResult>(
            keySelector: (v: T) => TKey,
            elementSelector: (v: T) => TElement,
            resultSelector: (key: TKey, elements: TElement[]) => TResult
        ): ILazyCollectionAsync<TResult, R, undefined> => chainAsync(λ.groupByAsync(source, keySelector, elementSelector, resultSelector)),
        indices: (predicate: (value: T, index: number) => boolean | Promise<boolean>): ILazyCollectionAsync<number, R, undefined> => chainAsync(λ.indicesAsync(source, predicate)),
        lazyChunk: (size: number): ILazyCollectionAsync<ILazyCollectionAsync<T, void, unknown>, R, undefined> => chainAsync(λ.lazyChunkAsync(source, size)),
        lazyGroupBy: <TKey, TElement, TResult>(
            keySelector: (v: T) => TKey,
            elementSelector: (v: T) => TElement,
            resultSelector: (key: TKey, elements: ILazyCollectionAsync<TElement, void, undefined>) => TResult
        ): ILazyCollectionAsync<TResult, R, undefined> => chainAsync(λ.lazyGroupByAsync(source, keySelector, elementSelector, resultSelector)),
        lazyPartition: (predicate: (value: T, index: number) => boolean | Promise<boolean>): ILazyCollection<ILazyCollectionAsync<T, void, undefined>, void, undefined> => chain(λ.lazyPartitionAsync(source, predicate)),
        map: <V>(transformer: (v: T, index: number) => V): ILazyCollectionAsync<V, R, undefined> => chainAsync(λ.mapAsync(source, transformer)),
        prepend: (...iterables: Array<Iterable<T> | AsyncIterable<T>>): ILazyCollectionAsync<T, R, undefined> => chainAsync(λ.prependAsync(source, ...iterables)),
        repeat: (c: number): ILazyCollectionAsync<T, R | undefined, undefined> => chainAsync(λ.repeatAsync(source, c)),
        skip: (c: number): ILazyCollectionAsync<T, R, undefined> => chainAsync(λ.skipAsync(source, c)),
        skipWhile: (predicate: (value: T, index: number) => boolean | Promise<boolean>): ILazyCollectionAsync<T, R, undefined> => chainAsync(λ.skipWhileAsync(source, predicate)),
        sort: (...comparer: OptionalComparer<T>): ILazyCollectionAsync<T, R, undefined> => chainAsync(λ.sortAsync(source, ...comparer)),
        splice: (start: number, deleteCount?: number, ...items: T[]): ILazyCollectionAsync<T, T[], undefined> => chainAsync(λ.spliceAsync(source, start, deleteCount, ...items)), 
        spread: (): ILazyCollectionAsync<T extends Iterable<infer U> | AsyncIterable<infer U> ? U : T, R, undefined> => chainAsync(λ.spreadAsync(source)),
        take: (c: number): ILazyCollectionAsync<T, R | undefined, undefined> => chainAsync(λ.takeAsync(source, c)),
        takeWhile: (predicate: (value: T, index: number) => boolean | Promise<boolean>): ILazyCollectionAsync<T, R | undefined, undefined> => chainAsync(λ.takeWhileAsync(source, predicate)),
        zip: <T2, R2, TResult>(iterator2: Iterator<T2, R2, N> | AsyncIterator<T2, R2, N>, resultSelector: (first: T, second: T2) => TResult): ILazyCollectionAsync<TResult, R | R2 | undefined, undefined> =>
            chainAsync(λ.zipAsync(source, iterator2, resultSelector)),
        //#endregion

        //#region Consumers
        average: (...select: T extends number ? [] : [(value: T) => number]): Promise<number> => γ.averageAsync(source, ...select),
        count: (): Promise<number> => γ.countAsync(source),
        every: (predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<boolean> => γ.everyAsync(source, predicate),
        first: (predicate?: (value: T, index: number) => boolean | Promise<boolean>): Promise<T | undefined> => γ.firstAsync(source, predicate),
        firstWithIndex: (predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<[T | undefined, number]> => γ.firstWithIndexAsync(source, predicate),
        includes: (predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<boolean> => γ.includesAsync(source, predicate),
        indexOf: (predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<number> => γ.indexOfAsync(source, predicate),
        join: (separator: string, ...select: Select<T, Primitive>): Promise<string> => γ.joinAsync(source, separator, ...select),
        last: (predicate?: (value: T) => boolean | Promise<boolean>): Promise<T | undefined> => γ.lastAsync(source, predicate),
        lastIndexOf: (predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<number> => γ.lastIndexOfAsync(source, predicate),
        lastWithIndex: (predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<[T | undefined, number]> => γ.lastWithIndexAsync(source, predicate),
        max: (...select: T extends number ? [] : [(value: T) => number]): Promise<number> => γ.maxAsync(source, ...select),
        min: (...select: T extends number ? [] : [(value: T) => number]): Promise<number> => γ.minAsync(source, ...select),
        partition: (predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<[T[], T[]]> => γ.partitionAsync(source, predicate),
        product: (...select: T extends number ? [] : [(value: T) => number]): Promise<number> => γ.productAsync(source, ...select),
        reduce: <U>(fun: (value: T, accumulator: U) => U, initial: U): Promise<U> => γ.reduceAsync(source, fun, initial),
        run: (): Promise<R> => γ.runAsync(source),
        sum: (...select: T extends number ? [] : [(value: T) => number]): Promise<number> => γ.sumAsync(source, ...select),
        toArray: (): Promise<T[]> => γ.toArrayAsync(source),
        toAsyncIterator: (): AsyncIterator<T, R, N> => source,
        toMap: <K, V>(select: (value: T) => [K, V]): Promise<Map<K, V>> => γ.toMapAsync(source, select),
        toSet: (): Promise<Set<T>> => γ.toSetAsync(source),
        toWeakMap: <K extends object, V>(select: (value: T) => [K, V]): Promise<WeakMap<K, V>> => γ.toWeakMapAsync(source, select),
        toWeakSet: <K extends object>(...select: T extends object ? [] : [(value: T) => K]): Promise<WeakSet<K>> => γ.toWeakSetAsync(source, ...select),
        uppend: (iterator: Iterator<T, R, N> | AsyncIterator<T, R, N>, equals: (oldElement: T, newElement: T) => boolean | Promise<boolean>): Promise<T[]> => γ.uppendAsync(source, iterator, equals),
        //#endregion
    };
}
