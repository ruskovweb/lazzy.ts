import { ILazyCollectionAsync } from ".";
import { Depth, OptionalComparer, Primitive, Select, FlatArray } from "../common/helpers";

export interface ILazyCollection<T, R, N> {
    [Symbol.iterator](): Iterator<T, R, N>;

    //#region Generators
    append(...iterables: Array<Iterable<T>>): ILazyCollection<T, R, N>;
    at(index: number): ILazyCollection<T, R, N>;
    balancedChunk(target: number, ...select: T extends number ? [] : [(value: T) => number]): ILazyCollection<T[], void, undefined>;
    chunk(size: number): ILazyCollection<T[], R, N>;
    concat(...iterators: Array<Iterator<T, unknown, unknown>>): ILazyCollection<T, void, undefined>;
    custom<T2, R2, N2>(generator: (iterator: Iterator<T, R, N>) => Generator<T2, R2, N2>): ILazyCollection<T2, R2, N2>;
    distinct(...select: T extends Primitive ? [] : [(value: T) => Primitive]): ILazyCollection<T, R, undefined>;
    feed<R2, V>(from: Iterator<V, R2, T>): ILazyCollection<V, void, undefined>;
    fill(values: Iterable<T>, start?: number, end?: number): ILazyCollection<T, R, undefined>;
    filter(predicate: (value: T, index: number) => boolean): ILazyCollection<T, R, undefined>;
    filterWithIndex(predicate: (value: T, index: number) => boolean): ILazyCollection<[T, number], R, undefined>;
    flat<D extends Depth = 20>(depth?: D): ILazyCollection<FlatArray<T, D>, R, undefined>;
    flatMap<V, D extends Depth = 20>(transformer: (currentValue: T, index: number) => V, depth?: D): ILazyCollection<FlatArray<V, D>, R, undefined>;
    forEach(fun: (v: T, i: number) => void): ILazyCollection<T, R, undefined>;
    groupBy<TKey, TElement, TResult>(keySelector: (v: T) => TKey, elementSelector: (v: T) => TElement, resultSelector: (key: TKey, elements: TElement[]) => TResult): ILazyCollection<TResult, R, undefined>;
    indices(predicate: (value: T, index: number) => boolean): ILazyCollection<number, R, undefined>;
    lazyChunk(size: number): ILazyCollection<ILazyCollection<T, void, unknown>, R, undefined>;
    lazyGroupBy<TKey, TElement, TResult>(keySelector: (v: T) => TKey, elementSelector: (v: T) => TElement, resultSelector: (key: TKey, elements: ILazyCollectionAsync<TElement, void, undefined>) => TResult): ILazyCollection<TResult, R, undefined>;
    lazyPartition(predicate: (value: T, index: number) => boolean): ILazyCollection<ILazyCollectionAsync<T, void, undefined>, R, undefined>;
    map<V>(transformer: (v: T) => V): ILazyCollection<V, R, undefined>;
    prepend(...iterables: Array<Iterable<T>>): ILazyCollection<T, R, undefined>;
    repeat(count: number): ILazyCollection<T, R | undefined, undefined>;
    skip(count: number): ILazyCollection<T, R, undefined>;
    skipWhile(predicate: (value: T, index: number) => boolean): ILazyCollection<T, R, undefined>;
    sort(...comparer: OptionalComparer<T>): ILazyCollection<T, R, undefined>;
    splice(start: number, deleteCount?: number, ...items: T[]): ILazyCollection<T, T[], undefined>;
    spread(): ILazyCollection<T extends Iterable<infer U> ? U : T, R, undefined>;
    take(count: number): ILazyCollection<T, R | undefined, undefined>;
    takeWhile(predicate: (value: T, index: number) => boolean): ILazyCollection<T, R | undefined, undefined>;
    zip<T2, R2, TResult>(iterator: Iterator<T2, R2, N>, resultSelector: (first: T, second: T2) => TResult): ILazyCollection<TResult, R | R2 | undefined, undefined>;
    //#endregion

    //#region Consumers
    average(...select: T extends number ? [] : [(value: T) => number]): number;
    count(): number;
    every(predicate: (value: T, index: number) => boolean): boolean;
    first(predicate?: (value: T, index: number) => boolean): T | undefined;
    firstWithIndex(predicate: (value: T, index: number) => boolean): [T | undefined, number];
    includes(predicate: (value: T, index: number) => boolean): boolean;
    indexOf(predicate: (value: T, index: number) => boolean): number;
    join(separator: string, ...select: Select<T, Primitive>): string;
    last(predicate?: (value: T) => boolean): T | undefined;
    lastIndexOf(predicate: (value: T, index: number) => boolean): number;
    lastWithIndex(predicate: (value: T, index: number) => boolean): [T | undefined, number];
    max(...select: T extends number ? [] : [(value: T) => number]): number;
    min(...select: T extends number ? [] : [(value: T) => number]): number;
    partition(predicate: (value: T, index: number) => boolean): [T[], T[]];
    product(...select: T extends number ? [] : [(value: T) => number]): number;
    reduce<V>(fun: (value: T, accumulator: V) => V, initial: V): V;
    run(): R;
    sum(...select: T extends number ? [] : [(value: T) => number]): number;
    toArray(): T[];
    toIterator(): Iterator<T, R, N>;
    toMap<K, V>(select: (value: T) => [K, V]): Map<K, V>;
    toSet(): Set<T>;
    toWeakMap<K extends object, V>(select: (value: T) => [K, V]): WeakMap<K, V>;
    toWeakSet<K extends object>(...select: T extends object ? [] : [(value: T) => K]): WeakSet<K>;
    uppend(iterator: Iterator<T, R, N>, equals: (oldElement: T, newElement: T) => boolean): T[];
    //#endregion
}
