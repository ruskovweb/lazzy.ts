export function every<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T, index: number) => boolean): boolean {
    let index = 0;
    let x = iterator.next();
    while (x.done !== true) {
        if (!predicate(x.value, index)) {
            return false;
        }

        x = iterator.next();
        index++;
    }
    
    return true;
}
