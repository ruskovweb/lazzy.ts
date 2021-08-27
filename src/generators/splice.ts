export function* splice<T, R, N>(iterator: Iterator<T, R, N>, start: number, deleteCount?: number, ...items: T[]): Generator<T, T[], undefined> {
    let index = 0;
    const deleted: T[] = [];

    let x = iterator.next();
    while (x.done !== true && start > index++) {
        yield x.value;
        x = iterator.next();
    }
    
    while (x.done !== true && (deleteCount == null || deleteCount-- > 0)) {
        deleted.push(x.value);
        x = iterator.next();
    }

    for (const item of items) {
        yield item;
    }

    while (x.done !== true) {
        yield x.value;
        x = iterator.next();
    }

    return deleted;
}
