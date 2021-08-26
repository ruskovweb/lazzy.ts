export const equals = <T>(value: T, transformer: (v: T) => T): boolean => value === transformer(value);
export const reverseString = (s: string): string => s.split("").reverse().join("");
