export function includes<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T, index: number) => boolean): boolean {
    let index = 0;
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value, index++)) {
            return true;
        }
        x = iterator.next();
    }
    return false;
}

export async function includesAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<boolean> {
    let index = 0;
    let x = await iterator.next();
    while (x.done !== true) {
        if (await predicate(x.value, index++)) {
            return true;
        }
        x = await iterator.next();
    }
    return false;
}
