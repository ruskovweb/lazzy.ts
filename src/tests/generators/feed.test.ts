import { expect } from "chai";
import Lazy from "../../lazy";
import { asyncIterator } from "../helpers";

describe("ƒ feed()", function () {
    it(`should return an array of the first prime numbers greater than a multiple of 1000`, function () {
        const primes = Lazy.prime(1000).toIterator();
        const result = Lazy.range({ from: 1000, to: 10000, step: 1000 }).feed(primes).toArray();
        expect(result).to.eql([1009, 2003, 3001, 4001, 5003, 6007, 7001, 8009, 9001, 10007]);
    });

    it(`should return an array of the first fibonacci numbers greater than a multiple of 10`, function () {
        const fibonacci = Lazy.fibonacci(10).toIterator();
        const result = Lazy.range({ from: 10, to: 100, step: 10 }).feed(fibonacci).toArray();

        expect(result).to.eql([13, 21, 34, 55, 55, 89, 89, 89, 144, 144]);
    });
});

describe("ƒ feedAsync()", function () {
    it(`should return an array of the first prime numbers greater than a multiple of 1000`, async function () {
        const fibonacci = Lazy.fibonacci().toIterator();
        const result = await Lazy.fromAsync(asyncIterator(10)).feed(fibonacci).toArray();
        expect(result).to.eql([1, 2, 3, 5, 5, 8, 8, 8, 13, 13]);
    });

    it(`should return an array of the first prime numbers greater than a multiple of 1000`, async function () {
        const primes = Lazy.prime(1000).toIterator();
        const generator = function () {
            let n = 0;
            return function () {
                return (n += 1000);
            };
        };

        const result = await Lazy.generateAsync(generator()).take(10).feed(primes).toArray();
        expect(result).to.eql([1009, 2003, 3001, 4001, 5003, 6007, 7001, 8009, 9001, 10007]);
    });

    it(`should return an array of the first fibonacci numbers greater than a multiple of 10`, async function () {
        const fibonacci = Lazy.fibonacci(10).toIterator();
        const generator = function () {
            let n = 0;
            return function () {
                return (n += 10);
            };
        };

        const result = await Lazy.generateAsync(generator()).take(10).feed(fibonacci).toArray();
        expect(result).to.eql([13, 21, 34, 55, 55, 89, 89, 89, 144, 144]);
    });
});
