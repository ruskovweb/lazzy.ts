export function* take<T, R, N>(iterator: Iterator<T, R, N>, count: number): Generator<T, R | undefined, undefined> {
    let x = iterator.next();
    while (x.done !== true && count-- > 0) {
        yield x.value;
        x = iterator.next();
    }
    
    if (x.done === true) {
        return x.value;
    } 
}

export async function* takeAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, count: number): AsyncGenerator<T, R | undefined, undefined> {
    let x = await iterator.next();
    while (x.done !== true && count-- > 0) {
        yield x.value;
        x = await iterator.next();
    }
    
    if (x.done === true) {
        return x.value;
    } 
}
