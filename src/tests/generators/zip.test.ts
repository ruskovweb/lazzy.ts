import { expect } from "chai";
import Lazy from "../..";
import { asyncIterator } from "../helpers";

describe("ƒ zip()", function () {
    it("should zip two arrays into a single one", function () {
        const zipped = Lazy.from([1, 2, 3, 4])
            .zip(Lazy.from(["one", "two", "three"]).toIterator(), (f, s) => `${f} - ${s}`)
            .toArray();
        expect(zipped).to.be.eql(["1 - one", "2 - two", "3 - three"]);
    });

    it("should zip two arrays into a new array of tuples", function () {
        const zipped = Lazy.from([1, 2, 3, 4])
            .zip(Lazy.from(["one", "two", "three"]).toIterator(), (f, s) => [f, s])
            .toArray();
        expect(zipped).to.be.deep.eq([
            [1, "one"],
            [2, "two"],
            [3, "three"],
        ]);
    });

    it("should return an empty array for empty input", function () {
        const zipped = Lazy.from([])
            .zip(Lazy.from(["one", "two", "three"]).toIterator(), (f, s) => `${f} - ${s}`)
            .toArray();
        expect(zipped).to.be.eql([]);
    });

    it("should return an empty array for empty zip input", function () {
        const zipped = Lazy.from([1, 2, 3])
            .zip(Lazy.from([]).toIterator(), (f, s) => `${f} - ${s}`)
            .toArray();
        expect(zipped).to.be.eql([]);
    });
});

describe("ƒ zipAsync()", function () {
    it("should zip two arrays into a single one", async function () {
        const zipped = await Lazy.fromAsync(asyncIterator())
            .zip(Lazy.from(["one", "two", "three"]).toIterator(), (f, s) => `${f} - ${s}`)
            .toArray();
        expect(zipped).to.be.eql(["1 - one", "2 - two", "3 - three"]);
    });

    it("should zip two arrays into a new array of tuples", async function () {
        const zipped = await Lazy.fromAsync(asyncIterator())
            .zip(Lazy.from(["one", "two", "three"]).toIterator(), (f, s) => [f, s])
            .toArray();
        expect(zipped).to.be.deep.eq([
            [1, "one"],
            [2, "two"],
            [3, "three"],
        ]);
    });

    it("should return an empty array for empty input", async function () {
        const zipped = await Lazy.fromAsync(asyncIterator(0))
            .zip(Lazy.from(["one", "two", "three"]).toIterator(), (f, s) => `${f} - ${s}`)
            .toArray();
        expect(zipped).to.be.eql([]);
    });

    it("should return an empty array for empty zip input", async function () {
        const zipped = await Lazy.fromAsync(asyncIterator(3))
            .zip(Lazy.from([]).toIterator(), (f, s) => `${f} - ${s}`)
            .toArray();
        expect(zipped).to.be.eql([]);
    });
});
