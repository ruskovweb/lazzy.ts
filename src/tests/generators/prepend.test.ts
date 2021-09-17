import { expect } from "chai";
import Lazy from "../..";
import { asyncIterator } from "../helpers";

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

describe("ƒ prepend()", function () {
    it("should prepend an array", async function () {
        const result = await Lazy.fromAsync(asyncIterator(5))
            .prepend([Promise.resolve(6), 7, 8, 9, 10])
            .toArray();
        expect(result).to.be.deep.eq([6, 7, 8, 9, 10, 1, 2, 3, 4, 5]);
    });

    it("should prepend multiple arrays", async function () {
        const iterator = Lazy.fromAsync(asyncIterator(10)).skip(7);
        const result = await Lazy.fromAsync(asyncIterator(5))
            .prepend([Promise.resolve(6), 7], iterator)
            .toArray();
        expect(result).to.be.deep.eq([6, 7, 8, 9, 10, 1, 2, 3, 4, 5]);
    });

    it("should prepend multiple arrays for chained calls", async function () {
        const result = await Lazy.fromAsync(asyncIterator(5)).prepend([6, 7]).prepend([8, 9, 10]).toArray();
        expect(result).to.be.deep.eq([8, 9, 10, 6, 7, 1, 2, 3, 4, 5]);
    });
});
