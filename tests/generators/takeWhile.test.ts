import { expect } from "chai";
import Lazy from "../../src";
import { asyncGenerator, asyncIterator } from "../helpers";

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

describe("ƒ takeWhileAsync()", function () {
    it("should take numbers while they are less than 5", async function () {
        const result = await Lazy.fromAsync(asyncIterator(10))
            .takeWhile((n) => n <= 5)
            .toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5]);
    });

    it("should take numbers while less than 5", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([5, 4, 2, 1, 3, 7, 2, 1, 2, 4]))
            .takeWhile((n) => n <= 5)
            .toArray();
        expect(result).to.be.eql([5, 4, 2, 1, 3]);
    });

    it("should not take any elements", async function () {
        const result = await Lazy.fromAsync(asyncIterator(10))
            .takeWhile((n) => n === 0)
            .toArray();
        expect(result).to.be.eql([]);
    });
});
