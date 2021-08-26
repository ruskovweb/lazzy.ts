export function* prime(minimum?: number): Generator<number, void, number> {
    let i: number;
    if (minimum == null) {
        yield 2;
        i = 3;
    } else {
        i = minimum % 2 === 0 ? minimum + 1 : minimum;
    }

    while (true) {
        if (!Number.isSafeInteger(i)) {
            return;
        }
        if (isPrime(i)) {
            const reply = yield i;
            if (reply !== undefined) {
                i = (reply % 2 === 0 ? reply + 1 : reply) - 2;
            }
        }
        i += 2;
    }
}

export function isPrime(number: number): boolean {
    if (number <= 3) {
        return number > 1;
    }
    if (number % 2 === 0 || number % 3 === 0) {
        return false;
    }
    let count = 5;
    while (Math.pow(count, 2) <= number) {
        if (number % count === 0 || number % (count + 2) === 0) {
            return false;
        }
        count += 6;
    }
    return true;
}
