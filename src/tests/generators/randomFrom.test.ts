import { expect, assert } from "chai";
import Lazy from "../../lazy";

describe("ƒ randomFrom()", function() {
    it("should generate 10 random values from an array of numbers", function() {
        const random = Lazy.randomFrom([1, 5, 9]).take(10).toArray();
        expect(random.length).to.be.equal(10);
        for (const n of random) {
            expect([1, 5, 9]).to.includes(n);
        }
    })

    it("should generate undefined 10 times from an empty array", function() {
        const random = Lazy.randomFrom([]).take(10).toArray();
        expect(random.length).to.be.equal(10);
        for (const val of random) {
            assert.isUndefined(val);
        }
    })
});
