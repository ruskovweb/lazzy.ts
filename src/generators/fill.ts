export function* fill<T, R, N>(iterator: Iterator<T, R, N>, values: Iterable<T>, start = 0, end?: number): Generator<T, R, undefined> {
    let index = 0;
    let x = iterator.next();

    while (x.done !== true && index++ < start) {
        yield x.value;
        x = iterator.next();
    }

    outer: while (true) {
        for (const value of values) {
            yield value;
            x = iterator.next();

            if (index++ === end || x.done === true) break outer;
        }
    }

    while (x.done !== true) {
        yield x.value;
        x = iterator.next();
    }

    return x.value;
}

export async function* fillAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, values: Iterable<T>| AsyncIterable<T>, start = 0, end?: number): AsyncGenerator<T, R, undefined> {
    let index = 0;
    let x = await iterator.next();

    while (x.done !== true && index++ < start) {
        yield x.value;
        x = await iterator.next();
    }

    outer: while (true) {
        for await (const value of values) {
            yield value;
            x = await iterator.next();

            if (index++ === end || x.done === true) break outer;
        }
    }

    while (x.done !== true) {
        yield x.value;
        x = await iterator.next();
    }

    return x.value;
}
