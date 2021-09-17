import { expect } from "chai";
import Lazy, { isPrime } from "../..";

describe("ƒ generate()", function () {
    it("should generate 10 numbers", function () {
        const generator = (function() {
            let number = 1;

            return function () {
                return number++;
            }
        })();
        const result = Lazy.generate(generator).take(10).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }); 

    it("should generate 10 fibonacci numbers", function () {
        const fibonacci = (function () {
            let prev = 1, next = 1;
        
            return function() {
                const current = prev;
                prev = next;
                next += current;
                return current;
            }
        })();

        const result = Lazy.generate(fibonacci).take(10).toArray();
        expect(result).to.be.eql([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });

    it("should generate 25 prime numbers", function () {
        const primes = (function () {
            let n = 2;
        
            return function() {
                while (!isPrime(n)) {
                    n++;
                }
                return n++;
            }
        })();

        const result = Lazy.generate(primes).take(25).toArray();
        expect(result).to.be.eql([
            2,   3,  5,  7, 11, 
            13, 17, 19, 23, 29, 
            31, 37, 41, 43, 47, 
            53, 59, 61, 67, 71, 
            73, 79, 83, 89, 97 
        ]);
    });
});

describe("ƒ generateAsync()", function () {
    it("should generate 10 numbers from sync funaction", async function () {
        const generator = (function() {
            let number = 1;

            return function () {
                return number++;
            }
        })();

        const result = await Lazy.generateAsync(generator).take(10).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }); 

    it("should generate 10 numbers from async funaction", async function () {
        const generator = (function() {
            let number = 1;

            return function () {
                return Promise.resolve(number++);
            }
        })();

        const result = await Lazy.generateAsync(generator).take(10).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }); 

    it("should generate 10 fibonacci numbers", async function () {
        const fibonacci = (function () {
            let prev = 1, next = 1;
        
            return function() {
                const current = prev;
                prev = next;
                next += current;
                return current;
            }
        })();

        const result = await Lazy.generateAsync(fibonacci).take(10).toArray();
        expect(result).to.be.eql([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });

    it("should generate 25 prime numbers", async function () {
        const primes = (function () {
            let n = 2;
        
            return function() {
                while (!isPrime(n)) {
                    n++;
                }
                return Promise.resolve(n++);
            }
        })();

        const result = await Lazy.generateAsync(primes).take(25).toArray();
        expect(result).to.be.eql([
            2,   3,  5,  7, 11, 
            13, 17, 19, 23, 29, 
            31, 37, 41, 43, 47, 
            53, 59, 61, 67, 71, 
            73, 79, 83, 89, 97 
        ]);
    });
});
