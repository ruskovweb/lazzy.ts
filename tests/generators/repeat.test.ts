import { expect } from "chai";
import Lazy from "../../src";
import { asyncIterator } from "../helpers";

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

describe("ƒ repeatAsync()", function () {
    it("should not repeat if count is negative", async function () {
        const repeat = await Lazy.fromAsync(asyncIterator(3)).repeat(-1).toArray();
        expect(repeat).to.be.eql([1, 2, 3]);
    });

    it("should not repeat if count is 0", async function () {
        const repeat = await Lazy.fromAsync(asyncIterator(3)).repeat(0).toArray();
        expect(repeat).to.be.eql([1, 2, 3]);
    });

    it("should repeat each value once", async function () {
        const repeat = await Lazy.fromAsync(asyncIterator(3)).repeat(1).toArray();
        expect(repeat).to.be.eql([1, 1, 2, 2, 3, 3]);
    });

    it("should repeat each value twice", async function () {
        const repeat = await Lazy.fromAsync(asyncIterator(3)).repeat(2).toArray();
        expect(repeat).to.be.eql([1, 1, 1, 2, 2, 2, 3, 3, 3]);
    });

    it("should repeat each value thrice", async function () {
        const repeat = await Lazy.fromAsync(asyncIterator(3)).repeat(3).toArray();
        expect(repeat).to.be.eql([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]);
    });
});
