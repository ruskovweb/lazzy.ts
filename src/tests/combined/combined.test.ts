import { expect } from "chai";
import Lazy, { isPrime } from "../..";
import { equals, reverseString } from "../helpers";

describe("combined", function () {
    describe("prime/filter/take/toArray", function () {
        it(`should return an array of the first 100 palindrom prime numbers greater than 10000`, function () {
            const palindromes = Lazy.prime(10000)
                .filter((p) => equals(p.toString(), reverseString))
                .take(100)
                .toArray();
            // prettier-ignore
            expect(palindromes).to.eql(
                [
                    10301,   10501,   10601,   11311,   11411,   12421,   12721,
                    12821,   13331,   13831,   13931,   14341,   14741,   15451,
                    15551,   16061,   16361,   16561,   16661,   17471,   17971,
                    18181,   18481,   19391,   19891,   19991,   30103,   30203,
                    30403,   30703,   30803,   31013,   31513,   32323,   32423,
                    33533,   34543,   34843,   35053,   35153,   35353,   35753,
                    36263,   36563,   37273,   37573,   38083,   38183,   38783,
                    39293,   70207,   70507,   70607,   71317,   71917,   72227,
                    72727,   73037,   73237,   73637,   74047,   74747,   75557,
                    76367,   76667,   77377,   77477,   77977,   78487,   78787,
                    78887,   79397,   79697,   79997,   90709,   91019,   93139,
                    93239,   93739,   94049,   94349,   94649,   94849,   94949,
                    95959,   96269,   96469,   96769,   97379,   97579,   97879,
                    98389,   98689, 1003001, 1008001, 1022201, 1028201, 1035301,
                    1043401, 1055501
                ]
            );
        });

        it(`should return an array of the first 100 Pythagorean prime numbers`, function () {
            const pythagoreanPrimes = Lazy.prime()
                .filter((p) => p % 4 === 1)
                .take(100)
                .toArray();
            // prettier-ignore
            expect(pythagoreanPrimes).to.eql([
                5,   13,   17,   29,   37,   41,   53,   61,   73,   89,   97,
                101,  109,  113,  137,  149,  157,  173,  181,  193,  197,  229,
                233,  241,  257,  269,  277,  281,  293,  313,  317,  337,  349,
                353,  373,  389,  397,  401,  409,  421,  433,  449,  457,  461,
                509,  521,  541,  557,  569,  577,  593,  601,  613,  617,  641,
                653,  661,  673,  677,  701,  709,  733,  757,  761,  769,  773,
                797,  809,  821,  829,  853,  857,  877,  881,  929,  937,  941,
                953,  977,  997, 1009, 1013, 1021, 1033, 1049, 1061, 1069, 1093,
                1097, 1109, 1117, 1129, 1153, 1181, 1193, 1201, 1213, 1217, 1229,
                1237
            ]);
        });
    });

    describe("prime/take/map/filter/toArray", function () {
        it(`should return the first 8 Mersenne primes`, function () {
            const mersennePrimes = Lazy.prime()
                .take(30)
                .map((p) => [p, 2 ** p - 1])
                .filter(([, e]) => isPrime(e))
                .toArray();

            expect(mersennePrimes).to.eql([
                [2, 3],
                [3, 7],
                [5, 31],
                [7, 127],
                [13, 8191],
                [17, 131071],
                [19, 524287],
                [31, 2147483647],
            ]);
        });
    });

    describe("array/take/keep/lazy", function () {
        it(`should return an array of the first two even numbers`, function () {
            const result = Lazy.from([1, 2, 3, 4, 5, 6, 7])
                .filter((n) => n % 2 === 0)
                .take(2)
                .toArray();
            expect(result).to.eql([2, 4]);
        });
    });

    describe("filter/take/map/includes", function () {
        it(`should return true if the specified conditions is met`, function () {
            const result = Lazy.from([1, 2, 3, 4, 5, 6, 7])
                .filter((x) => x % 2 === 0)
                .take(2)
                .map((x) => x * 2)
                .includes((e) => e === 8);
            expect(result).to.equal(true);
        });
        
        it(`should return false if the specified conditions is not met`, function () {
            const result = Lazy.from([1, 2, 3, 4, 5, 6, 7])
                .filter((x) => x % 2 === 0)
                .take(2)
                .map((x) => x * 2)
                .includes((e) => e === 3);
            expect(result).to.equal(false);
        });
    });

    describe("filter/take/indexOf", function () {
        it(`should return the correct index if the specified conditions is met`, function () {
            const result = Lazy.from([1, 2, 3, 4, 5, 6, 7])
                .filter((x) => x % 2 === 0)
                .take(2)
                .indexOf((e) => e === 4);
            expect(result).to.equal(1);
        });

        it(`should return -1 if the specified conditions is not met`, function () {
            const result = Lazy.from([1, 2, 3, 4, 5, 6, 7])
                .filter((x) => x % 2 === 0)
                .take(2)
                .indexOf((e) => e === 3);
            expect(result).to.equal(-1);
        });
    });

    describe("filter/skip/take/toArray", function () {
        it(`should return an array of the even numbers after skipping the first two`, function () {
            const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                .filter((x) => x % 2 === 0)
                .skip(2)
                .take(2)
                .toArray();
            expect(result).to.eql([6, 8]);
        });
    });

    describe("prime/skip/take/map/filter/flat/lazyChunk/toMap", function () {
        it(`should skip and take 5 of the Mersenne primes in lazy chunks then convert them to an array`, function () {
            const mersennePrimes = Lazy.prime()
                .skip(3)
                .take(30)
                .map((p) => [p, 2 ** p - 1])
                .filter(([, e]) => isPrime(e))
                .flat()
                .lazyChunk(2);

            const result = [];
            for (const chunk of mersennePrimes) {
                const tuple = chunk.toArray();
                result.push(tuple);
            }

            expect(result).to.be.deep.eq([
                [7, 127],
                [13, 8191],
                [17, 131071],
                [19, 524287],
                [31, 2147483647],
            ]);
        });
    });

    describe("filter/takeWhile/append/toArray", function () {
        it(`should append even numbers while they are smaller than 10`, function () {
            const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
                .filter((x) => x % 2 === 0)
                .takeWhile((e) => e < 10)
                .append([0, 0, 0])
                .toArray();
            expect(result).to.eql([2, 4, 6, 8, 0, 0, 0]);
        });
    });

    describe("filter/zip/toArray", function () {
        it(`should create an array of tuples from the two iterators until one runs out of elements`, function () {
            const result = Lazy.from([1, 2, 3, 4, 5, 6, 7])
                .filter((x) => x % 2 === 0)
                .zip(Lazy.from(["a", "b"]).toIterator(), (f, s) => [s, f])
                .toArray();
            expect(result).to.be.deep.eq([
                ["a", 2],
                ["b", 4],
            ]);
        });
    });
});
