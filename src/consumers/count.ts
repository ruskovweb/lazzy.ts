export function count<T, R, N>(iterator: Iterator<T, R, N>): number {
    let counter = 0;
    let x = iterator.next();
    while (x.done !== true) {
        counter++;
        x = iterator.next();
    }
    return counter;
}

export async function countAsync<T, R, N>(iterator: AsyncIterator<T, R, N>): Promise<number> {
    let counter = 0;
    let x = await iterator.next();
    while (x.done !== true) {
        counter++;
        x = await iterator.next();
    }
    return counter;
}
