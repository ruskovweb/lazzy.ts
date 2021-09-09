export function firstWithIndex<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T, index: number) => boolean): [T | undefined, number] {
    let index = 0;

    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value, index)) {
            return [x.value, index];
        }
        index++;
        x = iterator.next();
    }

    return [undefined, -1]
}

export async function firstWithIndexAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<[T | undefined, number]> {
    let index = 0;

    let x = await iterator.next();
    while (x.done !== true) {
        if (await predicate(x.value, index)) {
            return [x.value, index];
        }
        index++;
        x = await iterator.next();
    }

    return [undefined, -1]
}
