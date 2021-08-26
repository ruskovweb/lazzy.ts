import { assert, expect } from "chai";
import Lazy from "../..";

describe("ƒ toSet()", function () {
    it("shoult convert iterator to a set", function () {
        const result = Lazy.prime().take(5).toSet();
        assert.isTrue(result instanceof Set);
        expect(result.size).to.be.equal(5);
        expect(Array.from(result)).to.be.eql([2, 3, 5, 7, 11]);
    });
});
