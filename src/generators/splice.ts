export function* splice<T, R, N>(iterator: Iterator<T, R, N>, start: number, deleteCount?: number | undefined, ...items: T[]): Generator<T, T[], N> {
    let count = 0;
    const deleted = [];
    let x = iterator.next();
    
    while (true) {
        if (start === count) {
            while (x.done !== true && (deleteCount == null || deleteCount-- > 0)) {
                deleted.push(x.value);
                x = iterator.next();
            }

            for (const item of items) {
                yield item;
            }
        }

        if (x.done === true) {
            break;
        }

        yield x.value;
        x = iterator.next();
        count++;
    }

    return deleted;
}
