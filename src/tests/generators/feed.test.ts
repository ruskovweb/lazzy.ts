import { expect } from "chai";
import Lazy from "../../lazy";

describe("ƒ feed()", function () {
    it(`should return an array of the first prime numbers greater than a multiple of 1000`, function () {
        const primes = Lazy.prime(1000).toIterator();
        const result = Lazy.range({ from: 1000, to: 10000, step: 1000 }).feed(primes).toArray();
        expect(result).to.eql([1009, 2003, 3001, 4001, 5003, 6007, 7001, 8009, 9001, 10007]);
    });

    it(`should return an array of the first fibonacci numbers greater than a multiple of 10`, function () {
        const fibonacci = function* (initial = 0): Generator<number, void, number> {
            let [prev, next] = findClosestFibonacci(initial);

            while (true) {
                const current = prev;
                prev = next;
                next += current;
                const reply = yield current;
                if (reply != null) {
                    [prev, next] = findClosestFibonacci(reply);
                }
            }
        };
       
        function findClosestFibonacci(n: number, prev = 1, next = 1): [number, number] {
            if (next < n) {
                return findClosestFibonacci(n, next, prev + next);
            }
            return [next, prev + next];
        }

        const result = Lazy.range({ from: 10, to: 100, step: 10 })
            .feed(fibonacci(10))
            .toArray();
        
        expect(result).to.eql([13, 21, 34, 55, 55, 89, 89, 89, 144, 144]);
    });
});
