import { expect } from "chai";
import Lazy from "../..";
import { asyncGenerator } from "../helpers";

describe("ƒ flat()", function () {
    it("should flat the array at the deepest level", function () {
        const array = [[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]];
        const flatten = Lazy.from(array).flat().toArray();
        expect(flatten).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("should return the same array with zero level of depth", function () {
        const array = [[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]];
        const flatten = Lazy.from(array).flat(0).toArray();
        expect(flatten).to.be.eql([[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]]);
    });

    it("should flat the array with one level of depth", function () {
        const array = [[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]];
        const flatten = Lazy.from(array).flat(1).toArray();
        expect(flatten).to.be.eql([1, 2, 3, [4], [5, 6], 7, [[8], 9]]);
    });

    it("should flat the array with two levels of depth", function () {
        const array = [[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]];
        const flatten = Lazy.from(array).flat(2).toArray();
        expect(flatten).to.be.eql([1, 2, 3, 4, 5, 6, 7, [8], 9]);
    });

    it("should flat the array with two levels of depth, expect proper type for consistent data", function () {
        const array = [
            [
                [1, 2],
                [3, 4],
            ],
            [
                [5, 6],
                [7, 8, 9],
            ],
        ];
        const flatten = Lazy.from(array).flat().toArray();
        expect(flatten).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
});

describe("ƒ flatAsync()", function () {
    it("should flat the array at the deepest level", async function () {
        const array = [[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]];
        const flatten = await Lazy.fromAsync(asyncGenerator(array)).flat().toArray();
        expect(flatten).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("should return the same array with zero level of depth", async function () {
        const array = [[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]];
        const flatten = await Lazy.fromAsync(asyncGenerator(array)).toArray();
        expect(flatten).to.be.eql([[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]]);
    });

    it("should flat the array with one level of depth", async function () {
        const array = [[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]];
        const flatten = await Lazy.fromAsync(asyncGenerator(array)).flat(1).toArray();
        expect(flatten).to.be.eql([1, 2, 3, [4], [5, 6], 7, [[8], 9]]);
    });

    it("should flat the array with two levels of depth", async function () {
        const array = [[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]];
        const flatten = await Lazy.fromAsync(asyncGenerator(array)).flat(2).toArray();
        expect(flatten).to.be.eql([1, 2, 3, 4, 5, 6, 7, [8], 9]);
    });

    it("should flat the array with two levels of depth, expect proper type for consistent data", async function () {
        const array = [
            [
                [1, 2],
                [3, 4],
            ],
            [
                [5, 6],
                [7, 8, 9],
            ],
        ];
        const flatten = await Lazy.fromAsync(asyncGenerator(array)).flat().toArray();
        expect(flatten).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
});
