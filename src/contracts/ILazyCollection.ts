import { Depth, Primitive, Select, FlatArray } from "../common/helpers";

export interface ILazyCollection<T, R, N> {
    [Symbol.iterator](): Iterator<T, R, N>;

    //#region Generators
    append(...iterables: Array<Iterable<T>>): ILazyCollection<T, R, N>;
    at(index: number): ILazyCollection<T, R, N>;
    chunk(size: number): ILazyCollection<T[], R, N>;
    concat(...iterators: Array<Iterator<T, R, N>>): ILazyCollection<T, undefined, undefined>;
    distinct(...select: T extends Primitive ? [undefined?] : [(value: T) => Primitive]): ILazyCollection<T, R, undefined>;
    feed<R2, V>(into: Iterator<V, R2, T>): ILazyCollection<V, undefined, undefined>;
    filter(predicate: (value: T) => boolean): ILazyCollection<T, R | undefined, undefined>;
    filterWithIndex(predicate: (value: T) => boolean): ILazyCollection<[T, number], R | undefined, undefined>;
    flat<D extends Depth = 20>(depth?: D): ILazyCollection<FlatArray<T, D>, R, N>;
    flatMap<V, D extends Depth = 20>(transformer: (currentValue: T, index: number) => V, depth?: D): ILazyCollection<FlatArray<V, D>, R, N>;
    forEach(fun: (v: T, i: number) => void): ILazyCollection<T, R | undefined, undefined>;
    groupBy<TKey, TElement, TResult>(keySelector: (v: T) => TKey, elementSelector: (v: T) => TElement, resultSelector: (key: TKey, elements: TElement[]) => TResult): ILazyCollection<TResult, R, N>;
    indices(predicate: (value: T) => boolean): ILazyCollection<number, R, N>;
    
    /**
     * @description Use this function only in for-of loops, otherwise you risk falling into an infinite loop.
     * Avoid all other consumers like Array.from(), new Set(), etc.
     */
    lazyChunk(size: number): Generator<ILazyCollection<T, void, unknown>, R, N>;
    map<V>(transformer: (v: T) => V): ILazyCollection<V, R | undefined, undefined>;
    prepend(...iterables: Array<Iterable<T>>): ILazyCollection<T, R, N>;
    repeat(count: number): ILazyCollection<T, R | undefined, undefined>;
    skip(count: number): ILazyCollection<T, R | undefined, undefined>;
    skipWhile(predicate: (value: T) => boolean): ILazyCollection<T, undefined, undefined>;
    spread(): ILazyCollection<T extends Iterable<infer U> ? U : T, R, undefined>;
    take(count: number): ILazyCollection<T, R | undefined, undefined>;
    takeWhile(predicate: (value: T) => boolean): ILazyCollection<T, number, undefined>;
    zip<T2, TResult>(iterator: Iterator<T2, R, N>, resultSelector: (first: T, second: T2) => TResult): ILazyCollection<TResult, R | undefined, N>;
    //#endregion

    //#region Consumers
    average(...select: T extends number ? [undefined?] : [(value: T) => number]): number;
    count(): number;
    every(predicate: (value: T, index: number) => boolean): boolean;
    first(predicate?: (value: T) => boolean): T | undefined;
    firstWithIndex(predicate: (value: T) => boolean): [T | undefined, number];
    includes(predicate: (value: T) => boolean): boolean;
    indexOf(predicate: (value: T) => boolean): number;
    join(separator: string, ...select: Select<T, Primitive>): string;
    last(predicate?: (value: T) => boolean): T | undefined;
    lastIndexOf(predicate: (value: T) => boolean): number;
    lastWithIndex(predicate: (value: T) => boolean): [T | undefined, number];
    max(...select: T extends number ? [undefined?] : [(value: T) => number]): number;
    min(...select: T extends number ? [undefined?] : [(value: T) => number]): number;
    partition(predicate: (value: T) => boolean): [T[], T[]];
    product(...select: T extends number ? [undefined?] : [(value: T) => number]): number;
    reduce<V>(fun: (value: T, accumulator: V) => V, initial: V): V;
    run(): R;
    sum(...select: T extends number ? [undefined?] : [(value: T) => number]): number;
    toArray(): T[];
    toIterator(): Iterator<T, R, N>;
    toMap<K, V>(select: (value: T) => [K, V]): Map<K, V>;
    toSet(): Set<T>;
    toWeakMap<K extends object, V>(select: (value: T) => [K, V]): WeakMap<K, V>;
    toWeakSet<K extends object>(...select: T extends object ? [undefined?] : [(value: T) => K]): WeakSet<K>;
    uppend(array: T[], equals: (oldElement: T, newElement: T) => boolean): T[];
    //#endregion
}
