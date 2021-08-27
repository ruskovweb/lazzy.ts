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
    for (let n = from; step < 0 ? n >= to : n <= to; n += step) {
        if (!Number.isSafeInteger(n)) {
            return;
        }
        yield n;
    }
}
