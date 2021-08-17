import { expect } from "chai";
import Lazy from "../..";

describe("ƒ skipWhile()", function () {
    it("should skip numbers until they are less than 5", function () {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .skipWhile((n) => n <= 5)
            .toArray();
        expect(result).to.be.eql([6, 7, 8, 9, 10]);
    });

    it("should skip numbers until less than 5", function () {
        const result = Lazy.from([5, 4, 2, 1, 3, 7, 2, 1, 2, 4])
            .skipWhile((n) => n <= 5)
            .toArray();
        expect(result).to.be.eql([7, 2, 1, 2, 4]);
    });

    it("should return same array if all elements don't match the predicate", function () {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .skipWhile((n) => n === 0)
            .toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should return same array if the first element match the predicate", function () {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .skipWhile((n) => n <= 1)
            .toArray();
        expect(result).to.be.eql([2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should return an empty array if all elements match the predicate", function () {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .skipWhile((n) => n <= 10)
            .toArray();
        expect(result).to.be.eql([]);
    });
});
