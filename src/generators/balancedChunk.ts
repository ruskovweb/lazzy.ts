import { sort } from "..";

export function* balancedChunk<T, R, N>(iterator: Iterator<T, R, N>, weight: number, ...select: T extends number ? [] : [(value: T) => number]): Generator<T[], void, undefined> {
    
    let selector: ((v: T) => number) | ((v: number) => number);
    if (select[0] !== undefined) {
        selector = select[0];
    } else {
        selector = (v: number): number => v;
    }

    let index = 0;
    let yieldedChunks = 0;
    const chunks: T[][] = [];
    const chunkSums: number[] = [];
    const sorted = sort(iterator, (a, b) => selector(b as T & number) - selector(a as T & number));

    let x = sorted.next();
    while (x.done !== true) {
        const n = selector(x.value as T & number);

        while (chunkSums[index - 1] + n <= weight) {
            index--;
        }

        if (chunkSums[index] == null) {
            chunkSums.push(0);
            chunks.push([]);
        }

        chunkSums[index] += n;
        chunks[index].push(x.value);

        while (index > 0 && chunkSums[index - 1] < chunkSums[index]) {
            swap(chunkSums, index);
            swap(chunks, index);
            index--;
        }

        if (chunkSums[index] >= weight) {
            yieldedChunks++;
            yield chunks[index];
        }

        index = chunks.length;
        x = sorted.next();
    }

    while (yieldedChunks < chunks.length) {
        yield chunks[yieldedChunks++];
    }
}

function swap<T>(array: T[], index: number): void {
    const tempChunks = array[index];
    array[index] = array[index - 1];
    array[index - 1] = tempChunks;
}
