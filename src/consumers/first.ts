export function first<T, R, N>(iterator: Iterator<T, R, N>, predicate?: (value: T, index: number) => boolean): T | undefined {
    let index = 0;
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate == null || predicate(x.value, index++)) {
            return x.value;
        }
        x = iterator.next();
    }
    return undefined;
}

export async function firstAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, predicate?: (value: T, index: number) => boolean | Promise<boolean>): Promise<T | undefined> {
    let index = 0;
    let x = await iterator.next();
    while (x.done !== true) {
        if (predicate == null || (await predicate(x.value, index++))) {
            return x.value;
        }
        x = await iterator.next();
    }
    return undefined;
}
