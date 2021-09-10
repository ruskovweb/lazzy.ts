export const equals = <T>(value: T, transformer: (v: T) => T): boolean => value === transformer(value);
export const reverseString = (s: string): string => s.split("").reverse().join("");

export function asyncIterator (): AsyncIterator<Promise<number>> {
    let n = 1;
    return {
        next: async function () {
            return { done: false, value: Promise.resolve(n++) };
        },
    };
};

export async function* asyncGenerator() {
    yield* [6, 7, 8, 9, 10];
}
