export function toArray<T, R, N>(iterator: Iterator<T, R, N>): T[] {
    const result: T[] = [];
    let x = iterator.next();
    while (x.done !== true) {
        result.push(x.value);
        x = iterator.next();
    }
    return result;
}

export async function toArrayAsync<T, R, N>(iterator: AsyncIterator<T, R, N>): Promise<T[]> {
    const result: T[] = [];
    let x = await iterator.next();
    while (x.done !== true) {
        result.push(x.value);
        x = await iterator.next();
    }
    return result;
}
