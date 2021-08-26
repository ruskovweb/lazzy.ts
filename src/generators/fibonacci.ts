export function* fibonacci(minimum = 1): Generator<number, void, number> {
    let [prev, next] = findClosestFibonacci(minimum);

    while (true) {
        const current = prev;
        prev = next;
        next += current;
        const reply = yield current;
        if (reply != null) {
            [prev, next] = findClosestFibonacci(reply);
        }
    }
};

function findClosestFibonacci(n: number, prev = 0, next = 1): [number, number] {
    if (next < n) {
        return findClosestFibonacci(n, next, prev + next);
    }
    return [next, prev + next];
}
