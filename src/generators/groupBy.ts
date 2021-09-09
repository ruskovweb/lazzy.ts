export function* groupBy<T, R, N, TKey, TElement, TResult>(
    iterator: Iterator<T, R, N>,
    keySelector: (v: T) => TKey,
    elementSelector: (v: T) => TElement,
    resultSelector: (key: TKey, elements: TElement[]) => TResult
): Generator<TResult, R, undefined> {
    const groups = new Map<TKey, TElement[]>();

    let x = iterator.next();
    while (x.done !== true) {
        const key = keySelector(x.value);
        const element = elementSelector(x.value);
        if (!groups.has(key)) {
            groups.set(key, []);
        }

        const group = groups.get(key);
        group?.push(element);
        x = iterator.next();
    }

    for (const [key, value] of groups) {
        yield resultSelector(key, value);
    }

    return x.value;
}

export async function* groupByAsync<T, R, N, TKey, TElement, TResult>(
    iterator: AsyncIterator<T, R, N>,
    keySelector: (v: T) => TKey,
    elementSelector: (v: T) => TElement,
    resultSelector: (key: TKey, elements: TElement[]) => TResult
): AsyncGenerator<TResult, R, undefined> {
    const groups = new Map<TKey, TElement[]>();

    let x = await iterator.next();
    while (x.done !== true) {
        const key = keySelector(x.value);
        const element = elementSelector(x.value);
        if (!groups.has(key)) {
            groups.set(key, []);
        }

        const group = groups.get(key);
        group?.push(element);
        x = await iterator.next();
    }

    for (const [key, value] of groups) {
        yield resultSelector(key, value);
    }

    return x.value;
}
