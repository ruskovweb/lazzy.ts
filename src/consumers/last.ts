export function last<T, R, N>(iterator: Iterator<T, R, N>, predicate?: (value: T, index: number) => boolean): T | undefined {
    let index = 0;
    let result: T | undefined;
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate == null || predicate(x.value, index++)) {
            result = x.value;
        }
        x = iterator.next();
    }
    return result;
}

export async function lastAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, predicate?: (value: T, index: number) => boolean | Promise<boolean>): Promise<T | undefined> {
    let index = 0;
    let result: T | undefined;
    let x = await iterator.next();
    while (x.done !== true) {
        if (predicate == null || (await predicate(x.value, index++))) {
            result = x.value;
        }
        x = await iterator.next();
    }
    return result;
}
