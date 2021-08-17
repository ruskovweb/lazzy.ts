import { expect } from "chai";
import Lazy from "../..";

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
