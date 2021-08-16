export function* randomInt(lessThan: number): Generator<number, undefined, undefined> {
    while (true) {
        yield Math.trunc(Math.random() * lessThan);
    }
}
