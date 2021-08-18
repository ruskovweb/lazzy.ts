import { Depth, Primitive, Select } from "../common/helpers";
import { Interceptors } from "../generators/intercept";

export interface ILazyCollection<T, R, N> {
    [Symbol.iterator](): Iterator<T, R, N>;

    //#region Providers
    /**
     * @description Use this function only in for-of loops, otherwise you risk falling into an infinite loop.
     * Avoid all other consumers like Array.from(), new Set(), etc.
     */
    lazyChunk(size: number): Generator<ILazyCollection<T, void, unknown>, R, N>;

    at(index: number): ILazyCollection<T, R, N>;
    chunk(size: number): ILazyCollection<T[], R, N>;
    concat(...iterators: Array<Iterator<T, R, N>>): ILazyCollection<T, undefined, undefined>;
    append(...iterables: Array<Iterable<T>>): ILazyCollection<T, R, N>;
    prepend(...iterables: Array<Iterable<T>>): ILazyCollection<T, R, N>;
    distinct(...select: T extends Primitive ? [undefined?] : [(value: T) => Primitive]): ILazyCollection<T, R, undefined>;
    filter(predicate: (value: T) => boolean): ILazyCollection<T, R | undefined, undefined>;
    filterWithIndex(predicate: (value: T) => boolean): ILazyCollection<[T, number], R | undefined, undefined>;
    take(count: number): ILazyCollection<T, R | undefined, undefined>;
    takeWhile(predicate: (value: T) => boolean): ILazyCollection<T, number, undefined>;
    skip(count: number): ILazyCollection<T, R | undefined, undefined>;
    skipWhile(predicate: (value: T) => boolean): ILazyCollection<T, undefined, undefined>;
    indices(predicate: (value: T) => boolean): ILazyCollection<number, R, N>;
    map<V>(transformer: (v: T) => V): ILazyCollection<V, R | undefined, undefined>;
    repeat(count: number): ILazyCollection<T, R | undefined, undefined>;
    forEach(fun: (v: T, i: number) => void): ILazyCollection<T, R | undefined, undefined>;
    pair(): ILazyCollection<[T, T], R, N>;
    spread(): ILazyCollection<T extends Iterable<infer U> ? U : T, R, undefined>;
    zip<T2, TResult>(iterator: Iterator<T2, R, N>, resultSelector: (first: T, second: T2) => TResult): ILazyCollection<TResult, R | undefined, N>;
    intercept<C>(interceptors: Interceptors<C, T, R>, context: C): ILazyCollection<T, R, N>;
    feed<R2, V>(into: Iterator<V, R2, T>): ILazyCollection<V, undefined, undefined>;
    flat<D extends Depth = 20>(depth?: D): ILazyCollection<FlatArray<T, D>, R, N>;
    flatMap<V, D extends Depth = 20>(transformer: (currentValue: T, index: number) => V, depth?: D): ILazyCollection<FlatArray<V, D>, R, N>;
    groupBy<TKey, TElement, TResult>(keySelector: (v: T) => TKey, elementSelector: (v: T) => TElement, resultSelector: (key: TKey, elements: TElement[]) => TResult): ILazyCollection<TResult, R, N>;
    //#endregion

    //#region Consumers
    first(predicate: (value: T) => boolean): T | undefined;
    firstWithIndex(predicate: (value: T) => boolean): [T | undefined, number];
    last(predicate: (value: T) => boolean): T | undefined;
    lastWithIndex(predicate: (value: T) => boolean): [T | undefined, number];
    indexOf(predicate: (value: T) => boolean): number;
    lastIndexOf(predicate: (value: T) => boolean): number;
    includes(predicate: (value: T) => boolean): boolean;
    partition(predicate: (value: T) => boolean): [T[], T[]];
    product(...select: T extends number ? [undefined?] : [(value: T) => number]): number;
    sum(...select: T extends number ? [undefined?] : [(value: T) => number]): number;
    count(): number;
    reduce<V>(fun: (value: T, accumulator: V) => V, initial: V): V;
    uppend(array: T[], equals: (oldElement: T, newElement: T) => boolean): T[];
    run(): R;
    toIterator(): Iterator<T, R, N>;
    toArray(): T[];
    toSet(): Set<T>;
    toWeakSet<K extends object>(...select: T extends object ? [undefined?] : [(value: T) => K]): WeakSet<K>;
    toMap<K, V>(select: (value: T) => [K, V]): Map<K, V>;
    toWeakMap<K extends object, V>(select: (value: T) => [K, V]): WeakMap<K, V>;
    min(...select: T extends number ? [undefined?] : [(value: T) => number]): number;
    max(...select: T extends number ? [undefined?] : [(value: T) => number]): number;
    join(separator: string, ...select: Select<T, Primitive>): string;
    //#endregion
}
