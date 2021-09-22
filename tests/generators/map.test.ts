import { expect } from "chai";
import Lazy from "../../src";
import { asyncIterator } from "../helpers";

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

describe("ƒ mapAsync()", function () {
    it("should double each number", async function () {
        const result = await Lazy.fromAsync(asyncIterator(10))
            .map((n) => n * 2)
            .toArray();
        expect(result).to.be.eql([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
    });

    it("should decrease each number with one", async function () {
        const result = await Lazy.fromAsync(asyncIterator(10))
            .map((n) => n - 1)
            .toArray();
        expect(result).to.be.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
});
