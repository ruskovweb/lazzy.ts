import {Range} from "../common/helpers";

export interface RandomParams {
    min: number;
    max: number;
    precision: Range<0, 17>;
}

const rangeDefaults: RandomParams = {
    min: 0,
    max: Number.MAX_SAFE_INTEGER - 1,
    precision: 0
} as const;

export function* random(parameters?: Partial<RandomParams>): Generator<number, void, undefined> {
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
