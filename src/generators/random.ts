export interface RandomIntParams {
    min: number;
    max: number;
    precision: Precision;
}

type Enumerate<N extends number, RESULT extends number[] = []> = 
    RESULT["length"] extends N
    ? RESULT[number]
    : Enumerate<N, [...RESULT, RESULT["length"]]>;

type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>;
type Precision = Range<0, 17>;

const rangeDefaults: RandomIntParams = {
    min: 0,
    max: Number.MAX_SAFE_INTEGER - 1,
    precision: 0
} as const;

export function* random(parameters?: Partial<RandomIntParams>): Generator<number, undefined, undefined> {
    let { min, max, precision } = { ...rangeDefaults, ...parameters };

    const tempMax = max;
    max = Math.max(min, max);
    min = Math.min(min, tempMax);

    if (precision < 0) {
        precision = 0;
    } else if (precision > 16) {
        precision = 16;
    }

    const p = 10 ** precision;
    const diff = max - min;

    while (true) {
        yield Math.trunc((Math.random() * diff + min) * p) / p;
    }
}
