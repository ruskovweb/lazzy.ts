import { expect } from "chai";
import Lazy from "../..";

describe("ƒ append()", function () {
    it("should append an array", function () {
        const result = Lazy.from([1, 2, 3, 4, 5]).append([6, 7, 8, 9, 10]).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should append multiple arrays", function () {
        const result = Lazy.from([1, 2, 3, 4, 5]).append([6, 7], [8, 9, 10]).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should append multiple arrays for chained calls", function () {
        const result = Lazy.from([1, 2, 3, 4, 5]).append([6, 7]).append([8, 9, 10]).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
});
