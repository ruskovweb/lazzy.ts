import { expect } from "chai";
import Lazy from "../..";

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
