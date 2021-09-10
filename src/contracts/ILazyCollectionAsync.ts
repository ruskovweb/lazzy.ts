import { ILazyCollection } from ".";
import { Depth, OptionalComparer, Primitive, Select, FlatArray, PromiseValue } from "../common/helpers";

export interface ILazyCollectionAsync<T, R, N> {
    [Symbol.asyncIterator](): AsyncIterator<T, R, N>;

    //#region Generators
    append(...iterables: Array<Iterable<T> | AsyncIterable<T>>): ILazyCollectionAsync<T, R, N>;
    at(index: number): ILazyCollectionAsync<T, R, N>;
    balancedChunk(target: number, ...select: T extends number ? [] : [(value: T) => number]): ILazyCollectionAsync<T[], void, undefined>;
    chunk(size: number): ILazyCollectionAsync<T[], R, N>;
    concat(...iterators: Array<Iterator<T, unknown, unknown> | AsyncIterator<T, unknown, unknown>>): ILazyCollectionAsync<T, void, undefined>;
    custom<T2, R2, N2>(generator: (iterator: AsyncIterator<T, R, N>) => AsyncGenerator<T2, R2, N2>): ILazyCollectionAsync<T2, R2, N2>;
    distinct(...select: T extends Primitive ? [] : [(value: T) => Primitive]): ILazyCollectionAsync<T, R, undefined>;
    feed<R2, V>(from: Iterator<V, R2, T> | AsyncIterator<V, R2, T>): ILazyCollectionAsync<V, void, undefined>;
    fill(values: Iterable<T> | AsyncIterable<T>, start?: number, end?: number): ILazyCollectionAsync<T, R, undefined>;
    filter(predicate: (value: T, index: number) => boolean |  Promise<boolean>): ILazyCollectionAsync<T, R, undefined>;
    filterWithIndex(predicate: (value: T, index: number) => boolean | Promise<boolean>): ILazyCollectionAsync<[T, number], R, undefined>;
    flat<D extends Depth = 20>(depth?: D): ILazyCollectionAsync<FlatArray<T, D>, R, undefined>;
    flatMap<V, D extends Depth = 20>(transformer: (value: T, index: number) => V, depth?: D): ILazyCollectionAsync<FlatArray<V, D>, R, undefined>;
    forEach(action: (value: T, index: number) => void | Promise<void>): ILazyCollectionAsync<T, R, undefined>;
    groupBy<TKey, TElement, TResult>(keySelector: (value: T) => TKey, elementSelector: (value: T) => TElement, resultSelector: (key: TKey, elements: TElement[]) => TResult): ILazyCollectionAsync<TResult, R, undefined>;
    indices(predicate: (value: T, index: number) => boolean | Promise<boolean>): ILazyCollectionAsync<number, R, undefined>;
    lazyChunk(size: number): ILazyCollectionAsync<ILazyCollectionAsync<T, void, unknown>, R, undefined>;
    lazyGroupBy<TKey, TElement, TResult>(keySelector: (value: T) => TKey, elementSelector: (value: T) => TElement, resultSelector: (key: TKey, elements: ILazyCollectionAsync<TElement, void, undefined>) => TResult): ILazyCollectionAsync<TResult, R, undefined>;
    lazyPartition(predicate: (value: T, index: number) => boolean | Promise<boolean>): ILazyCollection<ILazyCollectionAsync<T, void, undefined>, void, undefined>;
    map<V>(transformer: (value: T, index: number) => V): ILazyCollectionAsync<V, R, undefined>;
    prepend(...iterables: Array<Iterable<T> | AsyncIterable<T>>): ILazyCollectionAsync<T, R, undefined>;
    repeat(count: number): ILazyCollectionAsync<T, R | undefined, undefined>;
    skip(count: number): ILazyCollectionAsync<T, R, undefined>;
    skipWhile(predicate: (value: T, index: number) => boolean | Promise<boolean>): ILazyCollectionAsync<T, R, undefined>;
    sort(...comparer: OptionalComparer<T>): ILazyCollectionAsync<T, R, undefined>;
    splice(start: number, deleteCount?: number, ...items: T[]): ILazyCollectionAsync<T, T[], undefined>;
    spread(): ILazyCollectionAsync<T extends Iterable<infer U> | AsyncIterable<infer U> ? U : T, R, undefined>;
    take(count: number): ILazyCollectionAsync<T, R | undefined, undefined>;
    takeWhile(predicate: (value: T, index: number) => boolean | Promise<boolean>): ILazyCollectionAsync<T, R | undefined, undefined>;
    zip<T2, R2, TResult>(iterator: Iterator<T2, R2, N> | AsyncIterator<T2, R2, N>, resultSelector: (first: T, second: T2) => TResult): ILazyCollectionAsync<TResult, R | R2 | undefined, undefined>;
    //#endregion

    //#region Consumers
    average(...select: T extends number ? [] : [(value: T) => number]): Promise<number>;
    count(): Promise<number>;
    every(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<boolean>;
    first(predicate?: (value: T, index: number) => boolean | Promise<boolean>): Promise<T | undefined>;
    firstWithIndex(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<[T | undefined, number]>;
    includes(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<boolean>;
    indexOf(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<number>;
    join(separator: string, ...select: Select<T, Primitive>): Promise<string>;
    last(predicate?: (value: T) => boolean | Promise<boolean>): Promise<T | undefined>;
    lastIndexOf(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<number>;
    lastWithIndex(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<[T | undefined, number]>;
    max(...select: T extends number ? [] : [(value: T) => number]): Promise<number>;
    min(...select: T extends number ? [] : [(value: T) => number]): Promise<number>;
    partition(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<[T[], T[]]>;
    product(...select: T extends number ? [] : [(value: T) => number]): Promise<number>;
    promiseAll(): Promise<PromiseValue<T>[]>;
    reduce<V>(reducer: (value: T, accumulator: V) => V, initial: V): Promise<V>;
    run(): Promise<R>;
    sum(...select: T extends number ? [] : [(value: T) => number]): Promise<number>;
    toArray(): Promise<T[]>;
    toAsyncIterator(): AsyncIterator<T, R, N>;
    toMap<K, V>(select: (value: T) => [K, V]): Promise<Map<K, V>>;
    toSet(): Promise<Set<T>>;
    toWeakMap<K extends object, V>(select: (value: T) => [K, V]): Promise<WeakMap<K, V>>;
    toWeakSet<K extends object>(...select: T extends object ? [] : [(value: T) => K]): Promise<WeakSet<K>>;
    uppend(iterator: Iterator<T, R, N> | AsyncIterator<T, R, N>, equals: (oldElement: T, newElement: T) => boolean | Promise<boolean>): Promise<T[]>;
    //#endregion
}
