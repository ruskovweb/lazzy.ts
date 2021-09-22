import { isPrime } from "..";

export const equals = <T>(value: T, transformer: (v: T) => T): boolean => value === transformer(value);
export const reverseString = (s: string): string => s.split("").reverse().join("");

export const primesAsync = function () {
    let n = 2;

    return function() {
        while (!isPrime(n)) {
            n++;
        }
        return Promise.resolve(n++);
    }
};

export function asyncIterator(end: number = Infinity): AsyncIterator<Promise<number>, void, undefined> {
    let n = 1;
    return {
        next: async function () {
            if (n > end) {
                return { done: true, value: undefined };
            }

            return { done: false, value: Promise.resolve(n++) };
        },
    };
};

export async function* asyncGenerator<T>(arr: T[]) {
    yield * arr;
}
