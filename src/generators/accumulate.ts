export function* accumulate(initial = 0): Generator<number, undefined, number> {
    while (true) {
        initial += yield initial;
    }
}
