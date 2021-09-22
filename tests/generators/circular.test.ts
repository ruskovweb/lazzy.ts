import { expect } from "chai";
import Lazy from "../../src";

describe("ƒ circular()", function () {
    it("should double the array", function () {
        const result = Lazy.circular([1, 2, 3, 4]).take(8).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 1, 2, 3, 4]);
    });

    it("should append the first two numbers", function () {
        const result = Lazy.circular([1, 2, 3, 4]).take(6).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 1, 2]);
    });

    it("should append the first number", function () {
        const result = Lazy.circular([1, 2, 3, 4]).take(5).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 1]);
    });

    it("should return same array", function () {
        const result = Lazy.circular([1, 2, 3, 4]).take(4).toArray();
        expect(result).to.be.eql([1, 2, 3, 4]);
    });
});
