import { expect } from "chai";
import Lazy from "../..";

describe("ƒ sum()", function () {
    it("should get the sum of all numbers", function () {
        const sum = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).sum();
        expect(sum).to.be.equal(55);
    });

    it("should get the sum of all numbers from objects", function () {
        const sum = Lazy.from([{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }]).sum((obj) => obj.n);
        expect(sum).to.be.equal(10);
    });
});
