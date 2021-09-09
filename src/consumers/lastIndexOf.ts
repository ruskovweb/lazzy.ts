export function lastIndexOf<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T, index: number) => boolean): number {
    let result = -1;
    let index = 0;
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value, index)) {
            result = index;
        }
        index++;
        x = iterator.next();
    }

    return result;
}

export async function lastIndexOfAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<number> {
    let result = -1;
    let index = 0;
    let x = await iterator.next();
    while (x.done !== true) {
        if (await predicate(x.value, index)) {
            result = index;
        }
        index++;
        x = await iterator.next();
    }

    return result;
}
