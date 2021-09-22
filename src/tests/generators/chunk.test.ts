import { expect } from "chai";
import Lazy from "../..";
import { asyncIterator } from "../helpers";

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

describe("ƒ chunkAsync()", function () {
    it("should split an array to multiple chunks", async function () {
        const chunks = await Lazy.fromAsync(asyncIterator()).take(10).chunk(3).toArray();
        expect(chunks).to.be.deep.eq([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
    });

    it("should return one chunk for size greater than the size of the array", async function () {
        const chunks = await Lazy.fromAsync(asyncIterator()).take(5).chunk(6).toArray();
        expect(chunks).to.be.deep.eq([[1, 2, 3, 4, 5]]);
    });

    it("should split an array into one by one chunks", async function () {
        const chunks = await Lazy.fromAsync(asyncIterator()).take(3).chunk(1).toArray();
        expect(chunks).to.be.deep.eq([[1], [2], [3]]);
    });

    it("should return an empty array for zero size of chunks", async function () {
        const chunks = await Lazy.fromAsync(asyncIterator()).take(3).chunk(0).toArray();
        expect(chunks).to.be.eql([[1, 2, 3]]);
    });

    it("should return an empty array for negative size of chunks", async function () {
        const chunks = await Lazy.fromAsync(asyncIterator()).take(10).chunk(-3).toArray();
        expect(chunks).to.be.eql([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);
    });
});
