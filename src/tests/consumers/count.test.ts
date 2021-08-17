import { expect } from "chai";
import Lazy from "../..";

describe("ƒ count()", function () {
    it("should return the length of an array", function () {
        const count = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).count();
        expect(count).to.be.equal(10);
    });

    it("should return the length of an empty array", function () {
        const count = Lazy.from([]).count();
        expect(count).to.be.equal(0);
    });
});
