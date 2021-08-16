import "mocha";
import { assert, expect } from "chai";
import Lazy from "..";
import { Interceptors } from "../generators";
import { equals, reverseString, primeGenerator, isPrime } from "../common/common";

describe("Lazy", function () {
    describe("generators", function () {
        describe("ƒ range()", function () {
            it("should generate 10 numbers", function () {
                const result = Lazy.generators.range({ from: 1, to: 10, step: 1 }).toArray();
                expect(result).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            });

            it("should generate 10 negative numbers", function () {
                const result = Lazy.generators.range({ from: -1, to: -10, step: -1 }).toArray();
                expect(result).to.be.eql([-1, -2, -3, -4, -5, -6, -7, -8, -9, -10]);
            });

            it("should generate an empty array for invalid input", function () {
                const result = Lazy.generators.range({ from: 1, to: 10, step: -1 }).toArray();
                expect(result).to.be.eql([]);
            });

            it("should generate an empty array for invalid input", function () {
                const result = Lazy.generators.range({ from: -1, to: -10, step: 1 }).toArray();
                expect(result).to.be.eql([]);
            });
        });

        describe("ƒ randomInt()", function () {
            it("should generate 10 numbers", function () {
                const result = Lazy.generators.randomInt(10).take(10).toArray();
                expect(result.length).to.be.equal(10);
                for (const number of result) {
                    expect(number).to.be.greaterThan(-1);
                    expect(number).to.be.lessThan(11);
                }
            });

            it("should generate 5 zeros", function () {
                const result = Lazy.generators.randomInt(0).take(5).toArray();
                expect(result).to.be.eql([0, 0, 0, 0, 0]);
            });
        });

        describe("ƒ circular()", function () {
            it("should double the array", function () {
                const result = Lazy.generators.circular([1, 2, 3, 4]).take(8).toArray();
                expect(result).to.be.eql([1, 2, 3, 4, 1, 2, 3, 4]);
            });

            it("should append the first two numbers", function () {
                const result = Lazy.generators.circular([1, 2, 3, 4]).take(6).toArray();
                expect(result).to.be.eql([1, 2, 3, 4, 1, 2]);
            });

            it("should append the first number", function () {
                const result = Lazy.generators.circular([1, 2, 3, 4]).take(5).toArray();
                expect(result).to.be.eql([1, 2, 3, 4, 1]);
            });

            it("should return same array", function () {
                const result = Lazy.generators.circular([1, 2, 3, 4]).take(4).toArray();
                expect(result).to.be.eql([1, 2, 3, 4]);
            });
        });
    });

    describe("combined", function () {
        describe("primeGenerator/filter/take/toArray", function () {
            it(`should return an array of the first 100 palindrom prime numbers greater than 10000`, function () {
                const palindromes = Lazy.from(primeGenerator(10000))
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
                const pythagoreanPrimes = Lazy.from(primeGenerator())
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

        describe("range/feed/toArray", function () {
            it(`should return an array of the first prime numbers greater than a multiple of 1000`, function () {
                const generator = primeGenerator(1000);
                const result = Lazy.generators.range({ from: 1000, to: 10000, step: 1000 }).feed(generator).toArray();
                expect(result).to.eql([1009, 2003, 3001, 4001, 5003, 6007, 7001, 8009, 9001, 10007]);
            });
        });

        describe("primeGenerator/take/map/filter/toArray", function () {
            it(`should return the first 8 Mersenne primes`, function () {
                const mersennePrimes = Lazy.from(primeGenerator())
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

        describe("primeGenerator/skip/take/map/filter/flat/lazyChunk/toMap", function () {
            it(`should skip and take 5 of the Mersenne primes in lazy chunks then convert them to an array`, function () {
                const mersennePrimes = Lazy.from(primeGenerator())
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

    describe("ƒ from()", function () {
        describe("ƒ chunk()", function () {
            it("should split an array to multiple chunks", function () {
                const chunks = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).chunk(3).toArray();
                expect(chunks).to.be.deep.eq([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
            });

            it("should return one chunk for size greater than the size of the array", function () {
                const chunks = Lazy.from([1, 2, 3, 4, 5]).chunk(6).toArray();
                expect(chunks).to.be.deep.eq([[1, 2, 3, 4, 5]]);
            });

            it("should split an array into one by one chunks", function () {
                const chunks = Lazy.from([1, 2, 3]).chunk(1).toArray();
                expect(chunks).to.be.deep.eq([[1], [2], [3]]);
            });

            it("should return an empty array for zero size of chunks", function () {
                const chunks = Lazy.from([1, 2, 3]).chunk(0).toArray();
                expect(chunks).to.be.eql([[1, 2, 3]]);
            });

            it("should return an empty array for negative size of chunks", function () {
                const chunks = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).chunk(-3).toArray();
                expect(chunks).to.be.eql([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);
            });
        });

        describe("ƒ lazyChunk()", function () {
            it("should split an array to multiple chunks", function () {
                const result: number[][] = [];
                for (const chunk of Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).lazyChunk(3)) {
                    result.push(chunk.toArray());
                }
                expect(result).to.be.deep.eq([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
            });

            it("should return one chunk for size greater than the size of the array", function () {
                const result: number[][] = [];
                for (const chunk of Lazy.from([1, 2, 3, 4, 5]).lazyChunk(6)) {
                    result.push(chunk.toArray());
                }
                expect(result).to.be.deep.eq([[1, 2, 3, 4, 5]]);
            });

            it("should split an array into one by one chunks", function () {
                const result: number[][] = [];
                for (const chunk of Lazy.from([1, 2, 3]).lazyChunk(1)) {
                    result.push(chunk.toArray());
                }
                expect(result).to.be.deep.eq([[1], [2], [3]]);
            });

            it("should return an empty array for zero size of chunks", function () {
                const result: number[][] = [];
                for (const chunk of Lazy.from([1, 2, 3]).lazyChunk(0)) {
                    result.push(chunk.toArray());
                }
                expect(result).to.be.eql([[1, 2, 3]]);
            });

            it("should return an empty array for negative size of chunks", function () {
                const result: number[][] = [];
                for (const chunk of Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).lazyChunk(-3)) {
                    result.push(chunk.toArray());
                }
                expect(result).to.be.eql([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);
            });
        });

        describe("ƒ concat()", function () {
            it("should concat two iterators", function () {
                const lazyArray = Lazy.from([6, 7, 8, 9, 10]).toIterator();
                const result = Lazy.from([1, 2, 3, 4, 5]).concat(lazyArray).toArray();
                expect(result).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            });

            it("should concat multiple iterators", function () {
                const lazyArray1 = Lazy.from([5, 6, 7]).toIterator();
                const lazyArray2 = Lazy.from([8, 9, 10]).toIterator();
                const result = Lazy.from([1, 2, 3, 4]).concat(lazyArray1, lazyArray2).toArray();
                expect(result).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            });

            it("should return same if empty array is passed", function () {
                const result = Lazy.from([1, 2, 3, 4, 5]).concat(Lazy.from([]).toIterator()).toArray();
                expect(result).to.be.eql([1, 2, 3, 4, 5]);
            });
        });

        describe("ƒ distinct()", function () {
            it("should remove all duplicates from number array", function () {
                const result = Lazy.from([1, 2, 2, 1, 3, 5, 4, 5]).distinct().toArray();
                expect(result).to.be.eql([1, 2, 3, 5, 4]);
            });

            it("should remove all duplicates from string array", function () {
                const result = Lazy.from(["a", "b", "a", "c", "b", "e", "c", "g"]).distinct().toArray();
                expect(result).to.be.eql(["a", "b", "c", "e", "g"]);
            });

            it("should remove all duplicates from boolean array", function () {
                const result = Lazy.from([true, false, false, true]).distinct().toArray();
                expect(result).to.be.eql([true, false]);
            });

            it("should remove all duplicates of objects by some property", function () {
                const result = Lazy.from([{ a: "a" }, { a: "b" }, { a: "a" }, { a: "b" }, { a: "c" }])
                    .distinct((o) => o.a)
                    .toArray();
                expect(result).to.be.deep.eq([{ a: "a" }, { a: "b" }, { a: "c" }]);
            });
        });

        describe("ƒ filter()", function () {
            it("should filter only even numbers", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                    .filter((n) => n % 2 === 0)
                    .toArray();
                expect(result).to.be.eql([2, 4, 6, 8, 10]);
            });

            it("should filter all numbers less than or equal to 5", function () {
                const result = Lazy.from([10, 2, 8, 1, 6, 7, 5, 4, 9])
                    .filter((n) => n <= 5)
                    .toArray();
                expect(result).to.be.eql([2, 1, 5, 4]);
            });

            it("should filter all records with same prop value", function () {
                const result = Lazy.from([
                    { a: "a", b: "b" },
                    { a: "b", b: "b" },
                    { a: "a", c: "c" },
                    { a: "b", c: "c" },
                    { a: "c", d: "d" },
                ])
                    .filter((o) => o.a === "a")
                    .toArray();

                expect(result).to.be.deep.eq([
                    { a: "a", b: "b" },
                    { a: "a", c: "c" },
                ]);
            });
        });

        describe("ƒ filterWithIndex()", function () {
            it("should filter only even numbers", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                    .filterWithIndex((n) => n % 2 === 0)
                    .toArray();
                expect(result).to.be.deep.eq([
                    [2, 1],
                    [4, 3],
                    [6, 5],
                    [8, 7],
                    [10, 9],
                ]);
            });

            it("should filter all numbers less than or equal to 5", function () {
                const result = Lazy.from([10, 2, 8, 1, 6, 7, 5, 4, 9])
                    .filterWithIndex((n) => n <= 5)
                    .toArray();
                expect(result).to.be.deep.eq([
                    [2, 1],
                    [1, 3],
                    [5, 6],
                    [4, 7],
                ]);
            });

            it("should filter all records with same prop value", function () {
                const result = Lazy.from([
                    { a: "a", b: "b" },
                    { a: "b", b: "b" },
                    { a: "a", c: "c" },
                    { a: "b", c: "c" },
                    { a: "c", d: "d" },
                ])
                    .filterWithIndex((o) => o.a === "a")
                    .toArray();

                expect(result).to.be.deep.eq([
                    [{ a: "a", b: "b" }, 0],
                    [{ a: "a", c: "c" }, 2],
                ]);
            });
        });

        describe("ƒ first()", function () {
            it("should get the first even number", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).first((n) => n % 2 === 0);
                expect(result).to.be.eql(2);
            });

            it("should get the first even number less than or equal to 5", function () {
                const result = Lazy.from([10, 9, 8, 7, 6, 7, 5, 4, 9]).first((n) => n <= 5);
                expect(result).to.be.eql(5);
            });

            it("should get the first record with searched prop value", function () {
                const result = Lazy.from([
                    { a: "a", b: "b" },
                    { a: "b", b: "b" },
                    { a: "a", c: "c" },
                    { a: "b", c: "c" },
                    { a: "c", d: "d" },
                ]).first((o) => o.a === "c");

                expect(result).to.be.deep.eq({ a: "c", d: "d" });
            });
        });

        describe("ƒ firstWithIndex()", function () {
            it("should get the first even number with index", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).firstWithIndex((n) => n % 2 === 0);
                expect(result).to.be.eql([2, 1]);
            });

            it("should get the first even number with index which is less than or equal to 5", function () {
                const result = Lazy.from([10, 8, 9, 6, 7, 5, 4, 9]).firstWithIndex((n) => n <= 5);
                expect(result).to.be.eql([5, 5]);
            });

            it("should get the first record with index for searched prop value", function () {
                const result = Lazy.from([
                    { a: "a", b: "b" },
                    { a: "b", b: "b" },
                    { a: "a", c: "c" },
                    { a: "b", c: "c" },
                    { a: "c", d: "d" },
                ]).firstWithIndex((o) => o.a === "c");

                expect(result).to.be.deep.eq([{ a: "c", d: "d" }, 4]);
            });
        });

        describe("ƒ last()", function () {
            it("should get the last even number", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).last((n) => n % 2 === 0);
                expect(result).to.be.eql(10);
            });

            it("should get the last even number less than or equal to 5", function () {
                const result = Lazy.from([10, 1, 8, 3, 6, 7, 5, 2, 9]).last((n) => n <= 5);
                expect(result).to.be.eql(2);
            });

            it("should get the last record with searched prop value", function () {
                const result = Lazy.from([
                    { a: "a", b: "b" },
                    { a: "b", b: "b" },
                    { a: "a", c: "c" },
                    { a: "b", c: "c" },
                    { a: "c", d: "d" },
                ]).last((o) => o.a === "a");

                expect(result).to.be.deep.eq({ a: "a", c: "c" });
            });
        });

        describe("ƒ lastWithIndex()", function () {
            it("should get the last even number with index", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).lastWithIndex((n) => n % 2 === 0);
                expect(result).to.be.eql([10, 9]);
            });

            it("should get the last even number with index which is less than or equal to 5", function () {
                const result = Lazy.from([10, 1, 8, 3, 6, 7, 5, 2, 9]).lastWithIndex((n) => n <= 5);
                expect(result).to.be.eql([2, 7]);
            });

            it("should get the last record with index for searched prop value", function () {
                const result = Lazy.from([
                    { a: "a", b: "b" },
                    { a: "b", b: "b" },
                    { a: "a", c: "c" },
                    { a: "b", c: "c" },
                    { a: "c", d: "d" },
                ]).lastWithIndex((o) => o.a === "b");

                expect(result).to.be.deep.eq([{ a: "b", c: "c" }, 3]);
            });
        });

        describe("ƒ take()", function () {
            it("should take the first five numbers", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).take(5).toArray();
                expect(result).to.be.eql([1, 2, 3, 4, 5]);
            });

            it("should take the same array if pass greater number than array length", function () {
                const result = Lazy.from([1, 2, 3, 4, 5]).take(10).toArray();
                expect(result).to.be.eql([1, 2, 3, 4, 5]);
            });

            it("should take zero elements if pass zero count", function () {
                const result = Lazy.from([1, 2, 3, 4, 5]).take(0).toArray();
                expect(result).to.be.eql([]);
            });

            it("should take zero elements if pass negative count", function () {
                const result = Lazy.from([1, 2, 3, 4, 5]).take(-5).toArray();
                expect(result).to.be.eql([]);
            });
        });

        describe("ƒ takeWhile()", function () {
            it("should take numbers while they are less than 5", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                    .takeWhile((n) => n <= 5)
                    .toArray();
                expect(result).to.be.eql([1, 2, 3, 4, 5]);
            });

            it("should take numbers while less than 5", function () {
                const result = Lazy.from([5, 4, 2, 1, 3, 7, 2, 1, 2, 4])
                    .takeWhile((n) => n <= 5)
                    .toArray();
                expect(result).to.be.eql([5, 4, 2, 1, 3]);
            });

            it("should not take any elements", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                    .takeWhile((n) => n === 0)
                    .toArray();
                expect(result).to.be.eql([]);
            });
        });

        describe("ƒ skip()", function () {
            it("should skip the first five numbers", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).skip(5).toArray();
                expect(result).to.be.eql([6, 7, 8, 9, 10]);
            });

            it("should skip all elements if pass same length as the array length", function () {
                const result = Lazy.from([1, 2, 3, 4, 5]).skip(5).toArray();
                expect(result).to.be.eql([]);
            });

            it("should skip all elements if pass greater length than the array length", function () {
                const result = Lazy.from([1, 2, 3, 4, 5]).skip(10).toArray();
                expect(result).to.be.eql([]);
            });

            it("should return same array if pass zero count", function () {
                const result = Lazy.from([1, 2, 3, 4, 5]).skip(0).toArray();
                expect(result).to.be.eql([1, 2, 3, 4, 5]);
            });

            it("should return same array if pass negative count", function () {
                const result = Lazy.from([1, 2, 3, 4, 5]).skip(-5).toArray();
                expect(result).to.be.eql([1, 2, 3, 4, 5]);
            });
        });

        describe("ƒ skipWhile()", function () {
            it("should skip numbers until they are less than 5", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                    .skipWhile((n) => n <= 5)
                    .toArray();
                expect(result).to.be.eql([6, 7, 8, 9, 10]);
            });

            it("should skip numbers until less than 5", function () {
                const result = Lazy.from([5, 4, 2, 1, 3, 7, 2, 1, 2, 4])
                    .skipWhile((n) => n <= 5)
                    .toArray();
                expect(result).to.be.eql([7, 2, 1, 2, 4]);
            });

            it("should return same array if all elements don't match the predicate", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                    .skipWhile((n) => n === 0)
                    .toArray();
                expect(result).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            });

            it("should return same array if the first element match the predicate", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                    .skipWhile((n) => n <= 1)
                    .toArray();
                expect(result).to.be.eql([2, 3, 4, 5, 6, 7, 8, 9, 10]);
            });

            it("should return an empty array if all elements match the predicate", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                    .skipWhile((n) => n <= 10)
                    .toArray();
                expect(result).to.be.eql([]);
            });
        });

        describe("ƒ indices()", function () {
            it("should get the indices of all even numbers", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                    .indices((n) => n % 2 === 0)
                    .toArray();
                expect(result).to.be.eql([1, 3, 5, 7, 9]);
            });

            it("should get the indices of all numbers less than or equal to 5", function () {
                const result = Lazy.from([10, 2, 8, 1, 6, 7, 5, 4, 9])
                    .indices((n) => n <= 5)
                    .toArray();

                expect(result).to.be.eql([1, 3, 6, 7]);
            });
            it("should get the indices of all records with searched prop value", function () {
                const result = Lazy.from([
                    { a: "a", b: "b" },
                    { a: "b", b: "b" },
                    { a: "a", c: "c" },
                    { a: "b", c: "c" },
                    { a: "c", d: "d" },
                ])
                    .indices((o) => o.a === "a")
                    .toArray();

                expect(result).to.be.eql([0, 2]);
            });
        });

        describe("ƒ append()", function () {
            it("should append an array", function () {
                const result = Lazy.from([1, 2, 3, 4, 5]).append([6, 7, 8, 9, 10]).toArray();
                expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            });

            it("should append multiple arrays", function () {
                const result = Lazy.from([1, 2, 3, 4, 5]).append([6, 7], [8, 9, 10]).toArray();
                expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            });

            it("should append multiple arrays for chained calls", function () {
                const result = Lazy.from([1, 2, 3, 4, 5]).append([6, 7]).append([8, 9, 10]).toArray();
                expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            });
        });

        describe("ƒ prepend()", function () {
            it("should prepend an array", function () {
                const result = Lazy.from([1, 2, 3, 4, 5]).prepend([6, 7, 8, 9, 10]).toArray();
                expect(result).to.be.deep.eq([6, 7, 8, 9, 10, 1, 2, 3, 4, 5]);
            });

            it("should prepend multiple arrays", function () {
                const result = Lazy.from([1, 2, 3, 4, 5]).prepend([6, 7], [8, 9, 10]).toArray();
                expect(result).to.be.deep.eq([6, 7, 8, 9, 10, 1, 2, 3, 4, 5]);
            });

            it("should prepend multiple arrays for chained calls", function () {
                const result = Lazy.from([1, 2, 3, 4, 5]).prepend([6, 7]).prepend([8, 9, 10]).toArray();
                expect(result).to.be.deep.eq([8, 9, 10, 6, 7, 1, 2, 3, 4, 5]);
            });
        });

        describe("ƒ product()", function () {
            it("should get the product of even numbers", function () {
                const product = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).product();
                expect(product).to.be.equal(3_628_800);
            });

            it("should get the product of even numbers from objects", function () {
                const product = Lazy.from([{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }]).product((obj) => obj.n);
                expect(product).to.be.equal(24);
            });
        });

        describe("ƒ sum()", function () {
            it("should get the sum of all numbers", function () {
                const sum = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).sum();
                expect(sum).to.be.equal(55);
            });

            it("should get the sum of all numbers from objects", function () {
                const sum = Lazy.from([{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }]).sum((obj) => obj.n);
                expect(sum).to.be.equal(10);
            });
        });

        describe("ƒ min()", function () {
            it("should get the smallest number of all numbers", function () {
                const min = Lazy.from([1, 2, 3, 4, 5, 6, -5, 7, 8, 9, 10]).min();
                expect(min).to.be.equal(-5);
            });

            it("should get the smallest number of all numbers from objects", function () {
                const min = Lazy.from([{ n: 2 }, { n: 4 }, { n: 1 }, { n: 3 }]).min((obj) => obj.n);
                expect(min).to.be.equal(1);
            });
        });

        describe("ƒ max()", function () {
            it("should get the biggest number of all numbers", function () {
                const max = Lazy.from([1, 2, 3, 10, 4, 5, 6, -5, 7, 8, 9]).max();
                expect(max).to.be.equal(10);
            });

            it("should get the biggest number of all numbers from objects", function () {
                const max = Lazy.from([{ n: 2 }, { n: 4 }, { n: 1 }, { n: 3 }]).max((obj) => obj.n);
                expect(max).to.be.equal(4);
            });
        });

        describe("ƒ join()", function () {
            it("should join numbers with comma and space", function () {
                const result = Lazy.from([1, 2, 3]).join(", ");
                expect(result).to.be.equal("1, 2, 3");
            });

            it("should join booleans with comma and space", function () {
                const result = Lazy.from([true, false, true]).join(", ");
                expect(result).to.be.equal("true, false, true");
            });

            it("should join strings with comma and space", function () {
                const result = Lazy.from(["value1", "value 2", "value, 3"]).join(", ");
                expect(result).to.be.equal("value1, value 2, value, 3");
            });

            it("should join numbers with comma and space from objects", function () {
                const result = Lazy.from([{ n: true }, { n: false }, { n: true }, { n: false }]).join(", ", (obj) => obj.n);
                expect(result).to.be.equal("true, false, true, false");
            });

            it("should join booleans with comma and space from objects", function () {
                const result = Lazy.from([{ n: 2 }, { n: 4 }, { n: 1 }, { n: 3 }]).join(", ", (obj) => obj.n);
                expect(result).to.be.equal("2, 4, 1, 3");
            });

            it("should join strings with comma and space from objects", function () {
                const result = Lazy.from([{ n: "value1" }, { n: "value 2" }, { n: "value, 3" }]).join(", ", (obj) => obj.n);
                expect(result).to.be.equal("value1, value 2, value, 3");
            });
        });

        describe("ƒ indexOf()", function () {
            it("should return the proper index", function () {
                const index = Lazy.from([1, 2, 3, 4, 5, 6, 7, 5, 9, 10]).indexOf((v) => v === 5);
                expect(index).to.be.equal(4);
            });

            it("should return -1 if no matches found", function () {
                const index = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).indexOf((v) => v === 11);
                expect(index).to.be.equal(-1);
            });
        });

        describe("ƒ lastIndexOf()", function () {
            it("should return the proper index", function () {
                const index = Lazy.from([1, 2, 3, 4, 5, 6, 7, 5, 9, 10]).lastIndexOf((v) => v === 5);
                expect(index).to.be.equal(7);
            });

            it("should return -1 if no matches found", function () {
                const index = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).lastIndexOf((v) => v === 11);
                expect(index).to.be.equal(-1);
            });
        });

        describe("ƒ count()", function () {
            it("should return the length of an array", function () {
                const count = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).count();
                expect(count).to.be.equal(10);
            });

            it("should return the length of an empty array", function () {
                const count = Lazy.from([]).count();
                expect(count).to.be.equal(0);
            });
        });

        describe("ƒ includes()", function () {
            it("should return true if find match", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).includes((n) => n === 5);
                assert.isTrue(result);
            });

            it("should return false if don't find match", function () {
                const result = Lazy.from([1, 2, 3, 4, 6, 7, 8, 9, 10]).includes((n) => n === 5);
                assert.isFalse(result);
            });

            it("shoshould return false for empty array", function () {
                const result = Lazy.from([]).includes((n) => n === 5);
                assert.isFalse(result);
            });
        });

        describe("ƒ reduce()", function () {
            it("should get the sum of all numbers", function () {
                const sum = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).reduce((value, acc) => {
                    acc += value;
                    return acc;
                }, 0);
                expect(sum).to.be.equal(55);
            });

            it("should get the product of all numbers", function () {
                const product = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).reduce((value, acc) => {
                    acc *= value;
                    return acc;
                }, 1);
                expect(product).to.be.equal(3_628_800);
            });
        });

        describe("ƒ map()", function () {
            it("should double each number", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                    .map((n) => n * 2)
                    .toArray();
                expect(result).to.be.eql([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
            });

            it("should decrease each number with one", function () {
                const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                    .map((n) => n - 1)
                    .toArray();
                expect(result).to.be.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });
        });

        describe("ƒ repeat()", function () {
            it("should not repeat if count is negative", function () {
                const repeat = Lazy.from([1, 2, 3]).repeat(-1).toArray();
                expect(repeat).to.be.eql([1, 2, 3]);
            });

            it("should not repeat if count is 0", function () {
                const repeat = Lazy.from([1, 2, 3]).repeat(0).toArray();
                expect(repeat).to.be.eql([1, 2, 3]);
            });

            it("should repeat each value once", function () {
                const repeat = Lazy.from([1, 2, 3]).repeat(1).toArray();
                expect(repeat).to.be.eql([1, 1, 2, 2, 3, 3]);
            });

            it("should repeat each value twice", function () {
                const repeat = Lazy.from([1, 2, 3]).repeat(2).toArray();
                expect(repeat).to.be.eql([1, 1, 1, 2, 2, 2, 3, 3, 3]);
            });

            it("should repeat each value thrice", function () {
                const repeat = Lazy.from([1, 2, 3]).repeat(3).toArray();
                expect(repeat).to.be.eql([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]);
            });
        });

        describe("ƒ forEach()", function () {
            it("should iterate through each value", function () {
                const array = [1, 2, 3];
                const result: number[] = [];

                Lazy.from(array)
                    .forEach((v, i) => (result[i] = v))
                    .run();

                expect(array).to.be.eql([1, 2, 3]); // Asserts that the original array is not modified
                expect(result).to.be.eql(array);
            });
        });

        describe("ƒ pair()", function () {
            it("should return pairs of the array", function () {
                const pairs = Lazy.from([1, 2, 3]).pair().toArray();
                expect(pairs).to.be.deep.eq([
                    [1, 2],
                    [2, 3],
                ]);
            });

            it("should return an empty array for empty input", function () {
                const pairs = Lazy.from([]).pair().toArray();
                expect(pairs).to.be.eql([]);
            });
        });

        describe("ƒ partition()", function () {
            it("should split the array into two parts", function () {
                const partition = Lazy.from([1, 2, 3, 4]).partition((n) => n % 2 === 0);
                expect(partition).to.be.deep.eq([
                    [2, 4],
                    [1, 3],
                ]);
            });

            it("should return two empty arrays if the iterator is empty", function () {
                const partition = Lazy.from([]).partition((n) => n % 2 === 0);
                expect(partition).to.be.deep.eq([[], []]);
            });
        });

        describe("ƒ uppend()", function () {
            it("should append only those values that do not exist in the new array", function () {
                const uppended = Lazy.from([1, 2, 3, 4, 6]).uppend([1, 3, 5, 4, 8], (oldValue, newValue) => oldValue === newValue);
                expect(uppended).to.be.deep.eq([1, 3, 5, 4, 8, 2, 6]);
            });

            it("should replace matched records with the new one and should append unmatched records", function () {
                const old = [
                    { a: "a", b: "c" },
                    { a: "j", b: "b" },
                    { a: "w", b: "c" },
                    { a: "b", b: "c" },
                    { a: "c", b: "q" },
                    { a: "z", b: "z" },
                    { a: "j", b: "r" },
                ];
                const newEntities = [
                    { a: "a", b: "b" },
                    { a: "b", b: "b" },
                    { a: "a", b: "c" },
                    { a: "b", b: "c" },
                    { a: "c", b: "d" },
                ];
                const expected = [
                    { a: "a", b: "c" },
                    { a: "b", b: "c" },
                    { a: "a", b: "c" },
                    { a: "b", b: "c" },
                    { a: "c", b: "q" },
                    { a: "j", b: "b" },
                    { a: "w", b: "c" },
                    { a: "z", b: "z" },
                    { a: "j", b: "r" },
                ];
                const uppended = Lazy.from(old).uppend(newEntities, (oldValue, newValue) => oldValue.a === newValue.a);
                expect(uppended).to.be.deep.eq(expected);
            });
        });

        describe("ƒ spread()", function () {
            it("should spread an array of strings", function () {
                const spread = Lazy.from(["test1", "test2", "t"]).spread().toArray();
                expect(spread).to.be.eql(["t", "e", "s", "t", "1", "t", "e", "s", "t", "2", "t"]);
            });

            it("should spread an array of arrays", function () {
                const spread = Lazy.from([
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8],
                ])
                    .spread()
                    .toArray();
                expect(spread).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8]);
            });
        });

        describe("ƒ zip()", function () {
            it("should zip two arrays into a single one", function () {
                const zipped = Lazy.from([1, 2, 3, 4])
                    .zip(Lazy.from(["one", "two", "three"]).toIterator(), (f, s) => `${f} - ${s}`)
                    .toArray();
                expect(zipped).to.be.eql(["1 - one", "2 - two", "3 - three"]);
            });

            it("should zip two arrays into a new array of tuples", function () {
                const zipped = Lazy.from([1, 2, 3, 4])
                    .zip(Lazy.from(["one", "two", "three"]).toIterator(), (f, s) => [f, s])
                    .toArray();
                expect(zipped).to.be.deep.eq([
                    [1, "one"],
                    [2, "two"],
                    [3, "three"],
                ]);
            });

            it("should return an empty array for empty input", function () {
                const zipped = Lazy.from([])
                    .zip(Lazy.from(["one", "two", "three"]).toIterator(), (f, s) => `${f} - ${s}`)
                    .toArray();
                expect(zipped).to.be.eql([]);
            });

            it("should return an empty array for empty zip input", function () {
                const zipped = Lazy.from([1, 2, 3])
                    .zip(Lazy.from([]).toIterator(), (f, s) => `${f} - ${s}`)
                    .toArray();
                expect(zipped).to.be.eql([]);
            });
        });

        describe("ƒ toArray()", function () {
            it("shoult convert iterator to an array", function () {
                const result = Lazy.from(primeGenerator()).take(5).toArray();
                expect(result).to.be.eql([2, 3, 5, 7, 11]);
            });
        });

        describe("ƒ toSet()", function () {
            it("shoult convert iterator to a set", function () {
                const result = Lazy.from(primeGenerator()).take(5).toSet();
                assert.isTrue(result instanceof Set);
                expect(result.size).to.be.equal(5);
                expect(Array.from(result)).to.be.eql([2, 3, 5, 7, 11]);
            });
        });

        describe("ƒ toWeakSet()", function () {
            it("shoult convert iterator to a weak map", function () {
                const keys = [{ n: "five" }, { n: "four" }, { n: "three" }, { n: "two" }, { n: "one" }];
                const result = Lazy.from(keys).toWeakSet();

                assert.isTrue(result instanceof WeakSet);
                for (const key of keys) {
                    assert.isTrue(result.has(key));
                }
            });
        });

        describe("ƒ toMap()", function () {
            it("shoult convert iterator to a map", function () {
                const result = Lazy.from(primeGenerator())
                    .take(5)
                    .toMap((v) => [v.toString(), v]);
                assert.isTrue(result instanceof Map);
                expect(result.size).to.be.equal(5);
                expect(Array.from(result)).to.be.eql([
                    ["2", 2],
                    ["3", 3],
                    ["5", 5],
                    ["7", 7],
                    ["11", 11],
                ]);
            });
        });

        describe("ƒ toWeakMap()", function () {
            it("shoult convert iterator to a weak map", function () {
                let count = 0;
                const expected = Lazy.from(primeGenerator()).take(5).toArray();
                const keys = [{ n: "five" }, { n: "four" }, { n: "three" }, { n: "two" }, { n: "one" }];
                const result = Lazy.from(primeGenerator())
                    .take(5)
                    .toWeakMap((v) => [keys[count++], v]);

                assert.isTrue(result instanceof WeakMap);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    assert.isTrue(result.has(key));
                    expect(result.get(key)).to.be.equal(expected[i]);
                }
            });
        });

        describe("ƒ intercept()", function () {
            let counter = 0;
            const context = { sum: 0 };
            const sums = [2, 5, 10, 17, 28];
            const array = Lazy.from(primeGenerator()).take(5).toArray();
            const interceptors: Interceptors<typeof context, number, undefined> = {
                before: assertBefore,
                beforeEach: assertBeforeEach,
                afterEach: assertAfterEach,
                afterUpdate: assertAfterUpdate,
                after: assertAfter,
            };

            function assertBefore(iteration: number, ctx: typeof context, value: undefined): void {
                const sum = ctx.sum;
                it(`should recieve proper arguments before all iterations`, function () {
                    expect(iteration).to.be.equal(0);
                    expect(sum).to.be.equal(0);
                    assert.isUndefined(value);
                });
            }

            function assertBeforeEach(iteration: number, ctx: typeof context, value: number): void {
                ctx.sum += value;

                const sum = ctx.sum;
                assertEach(iteration, sum, value, `should recieve proper arguments before each yield`);
            }

            function assertAfterEach(iteration: number, ctx: typeof context, value: number): void {
                const sum = ctx.sum;
                assertEach(iteration, sum, value, `should recieve proper arguments after each yield`);
            }

            function assertAfterUpdate(iteration: number, ctx: typeof context, value: number | undefined): void {
                const sum = ctx.sum;
                it(`should recieve proper arguments after update the value`, function () {
                    expect(iteration).to.be.equal(counter);
                    counter++;
                    if (counter === array.length) {
                        expect(sum).to.be.equal(sums[array.length - 1]);
                        assert.isUndefined(value);
                    } else {
                        expect(sum).to.be.equal(sums[counter - 1]);
                        expect(value).to.be.equal(array[counter]);
                    }
                });
            }

            function assertEach(iteration: number, sum: number, value: number, title: string): void {
                it(title, function () {
                    expect(iteration).to.be.equal(counter);
                    expect(sum).to.be.equal(sums[counter]);
                    expect(value).to.be.equal(array[counter]);
                });
            }

            function assertAfter(iteration: number, ctx: typeof context, value: number | undefined): void {
                const sum = ctx.sum;
                it(`should recieve proper arguments after all iterations`, function () {
                    expect(iteration).to.be.equal(array.length - 1);
                    expect(sum).to.be.equal(sums[array.length - 1]);
                    assert.isUndefined(value);
                });
            }

            Lazy.from(primeGenerator()).take(5).intercept(interceptors, context).run();
        });

        describe("ƒ flat()", function () {
            it("should flat the array at the deepest level", function () {
                const array = [[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]];
                const flatten = Lazy.from(array).flat().toArray();
                expect(flatten).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });

            it("should return the same array with zero level of depth", function () {
                const array = [[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]];
                const flatten = Lazy.from(array).flat(0).toArray();
                expect(flatten).to.be.eql([[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]]);
            });

            it("should flat the array with one level of depth", function () {
                const array = [[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]];
                const flatten = Lazy.from(array).flat(1).toArray();
                expect(flatten).to.be.eql([1, 2, 3, [4], [5, 6], 7, [[8], 9]]);
            });

            it("should flat the array with two levels of depth", function () {
                const array = [[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]];
                const flatten = Lazy.from(array).flat(2).toArray();
                expect(flatten).to.be.eql([1, 2, 3, 4, 5, 6, 7, [8], 9]);
            });

            it("should flat the array with two levels of depth, expect proper type for consistent data", function () {
                const array = [
                    [
                        [1, 2],
                        [3, 4],
                    ],
                    [
                        [5, 6],
                        [7, 8, 9],
                    ],
                ];
                const flatten = Lazy.from(array).flat().toArray();
                expect(flatten).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });
        });

        describe("ƒ flatMap()", function () {
            it("should multiple each number and append it to the original value, then should flat the array", function () {
                const array = [1, 2, 3, 4];
                const flatten = Lazy.from(array)
                    .flatMap((x) => [x, x * 2])
                    .toArray();
                expect(flatten).to.be.eql([1, 2, 2, 4, 3, 6, 4, 8]);
            });

            it("should double each number and flat the array", function () {
                const array = [1, 2, 3, 4];
                const flatten = Lazy.from(array)
                    .flatMap((x) => [x * 2])
                    .toArray();
                expect(flatten).to.be.eql([2, 4, 6, 8]);
            });

            it("should double each number in two dimensional array and flat the array with one level of depth", function () {
                const array = [1, 2, 3, 4];
                const flatten = Lazy.from(array)
                    .flatMap((x) => [[x * 2]], 1)
                    .toArray();
                expect(flatten).to.be.eql([[2], [4], [6], [8]]);
            });

            it("should double each number in five dimensional array and flat the array with two levels of depth", function () {
                const array = [1, 2, 3, 4];
                const flatten = Lazy.from(array)
                    .flatMap((x) => [[[[[x * 2]]]]], 2)
                    .toArray();
                expect(flatten).to.be.eql([[[[2]]], [[[4]]], [[[6]]], [[[8]]]]);
            });

            it("should double each number in five dimensional array and flat the array with all levels of depth", function () {
                const array = [1, 2, 3, 4];
                const flatten = Lazy.from(array)
                    .flatMap((x) => [[[[[x * 2]]]]])
                    .toArray();
                expect(flatten).to.be.eql([2, 4, 6, 8]);
            });

            it("should split all strings in array then should flat with one level of depth", function () {
                const array = ["it's Sunny in", "", "California"];
                const flatten = Lazy.from(array)
                    .flatMap((x) => x.split(" "))
                    .toArray();
                expect(flatten).to.be.eql(["it's", "Sunny", "in", "", "California"]);
            });

            it("should add and remove numbers by criteria, then should flat with one level of depth", function () {
                const array = [5, 4, -3, 20, 17, -33, -4, 18];
                const flatten = Lazy.from(array)
                    .flatMap((n) => (n < 0 ? [] : n % 2 === 0 ? [n] : [n - 1, 1]))
                    .toArray();
                expect(flatten).to.be.eql([4, 1, 4, 20, 16, 1, 18]);
            });
        });

        describe("ƒ groupBy()", function () {
            it("should group users by name", function () {
                const usersData = [
                    { name: "Ivan", age: 30 },
                    { name: "Ivan", age: 15 },
                    { name: "Georgi", age: 10 },
                    { name: "Georgi", age: 19 },
                    { name: "Ivan", age: 42 },
                ];

                const group = Lazy.from(usersData)
                    .groupBy(
                        (user) => user.name,
                        (user) => user.age,
                        (key, ages) => ({
                            name: key,
                            average: ages.reduce((prev, cur) => prev + cur, 0) / ages.length,
                        })
                    )
                    .toArray();

                const expected = [
                    { name: "Ivan", average: 29 },
                    { name: "Georgi", average: 14.5 },
                ];

                expect(group).to.be.deep.eq(expected);
            });
        });
    });
});
