import { expect } from "chai";
import Lazy from "../..";

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
