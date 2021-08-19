import { expect } from "chai";
import Lazy from "../..";

describe("ƒ randomInt()", function () {
    it("should generate 10 numbers", function () {
        const result = Lazy.randomInt(10).take(10).toArray();
        expect(result.length).to.be.equal(10);
        for (const number of result) {
            expect(number).to.be.greaterThan(-1);
            expect(number).to.be.lessThan(11);
        }
    });

    it("should generate 5 zeros", function () {
        const result = Lazy.randomInt(0).take(5).toArray();
        expect(result).to.be.eql([0, 0, 0, 0, 0]);
    });
});
