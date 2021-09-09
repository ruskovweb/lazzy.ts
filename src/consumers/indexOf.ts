export function indexOf<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T, index: number) => boolean): number {
    let index = 0;
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value, index)) {
            return index;
        }
        index++;
        x = iterator.next();
    }

    return -1;
}

export async function indexOfAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<number> {
    let index = 0;
    let x = await iterator.next();
    while (x.done !== true) {
        if (await predicate(x.value, index)) {
            return index;
        }
        index++;
        x = await iterator.next();
    }

    return -1;
}
