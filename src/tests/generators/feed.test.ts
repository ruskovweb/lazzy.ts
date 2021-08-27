import { expect } from "chai";
import Lazy from "../../lazy";

describe("ƒ feed()", function () {
    it(`should return an array of the first prime numbers greater than a multiple of 1000`, function () {
        const primes = Lazy.prime(1000).toIterator();
        const result = Lazy.range({ from: 1000, to: 10000, step: 1000 }).feed(primes).toArray();
        expect(result).to.eql([1009, 2003, 3001, 4001, 5003, 6007, 7001, 8009, 9001, 10007]);
    });

    it(`should return an array of the first fibonacci numbers greater than a multiple of 10`, function () {
        const fibonacci = Lazy.fibonacci(10).toIterator();
        const result = Lazy.range({ from: 10, to: 100, step: 10 })
            .feed(fibonacci)
            .toArray();
        
        expect(result).to.eql([13, 21, 34, 55, 55, 89, 89, 89, 144, 144]);
    });
});
