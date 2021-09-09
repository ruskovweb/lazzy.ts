export function lastWithIndex<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T, index: number) => boolean): [T | undefined, number] {
    let index = 0;
    let result: [T | undefined, number] = [undefined, -1];

    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value, index)) {
            result[0] = x.value;
            result[1] = index;
        }
        index++;
        x = iterator.next();
    }

    return result;
}

export async function lastWithIndexAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<[T | undefined, number]> {
    let index = 0;
    let result: [T | undefined, number] = [undefined, -1];

    let x = await iterator.next();
    while (x.done !== true) {
        if (await predicate(x.value, index)) {
            result[0] = x.value;
            result[1] = index;
        }
        index++;
        x = await iterator.next();
    }

    return result;
}
