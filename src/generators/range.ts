export interface RangeParams {
    from: number;
    to: number;
    step: number;
}

const rangeDefaults: RangeParams = {
    from: 0,
    to: Number.MAX_SAFE_INTEGER,
    step: 1,
} as const;

export function* range(parameters?: Partial<RangeParams>): Generator<number, void, undefined> {
    const { from, to, step } = { ...rangeDefaults, ...parameters };
    if (step === 0) {
        return;
    }
    
    const condition = step < 0 ? ((n: number) => n >= to) : ((n: number) => n <= to);

    for (let n = from; condition(n); n += step) {
        if (!Number.isSafeInteger(n)) {
            return;
        }
        yield n;
    }
}
