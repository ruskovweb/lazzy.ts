import { expect } from "chai";
import Lazy from "../../src";
import { asyncIterator } from "../helpers";

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

describe("ƒ concatAsync()", function () {
    it("should concat async iterator with a sync iterator", async function () {
        const iterator = Lazy.from([6, 7, 8, 9, 10]).toIterator();
        const result = await Lazy.fromAsync(asyncIterator()).take(5).concat(iterator).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should concat tow async iterators", async function () {
        const iterator = Lazy.fromAsync(asyncIterator()).skip(5).take(5).toAsyncIterator();
        const result = await Lazy.fromAsync(asyncIterator()).take(5).concat(iterator).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should concat multiple iterators", async function () {
        const iterator1 = Lazy.fromAsync(asyncIterator()).skip(4).take(3).toAsyncIterator();
        const iterator2 = Lazy.fromAsync(asyncIterator()).skip(7).take(3).toAsyncIterator();
        const result = await Lazy.fromAsync(asyncIterator()).take(4).concat(iterator1, iterator2).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should return same if empty array is passed", async function () {
        const result = await Lazy.fromAsync(asyncIterator()).take(5).concat(Lazy.from([]).toIterator()).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5]);
    });
});
