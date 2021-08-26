import { expect } from "chai";
import Lazy from "../..";

describe("ƒ toArray()", function () {
    it("shoult convert iterator to an array", function () {
        const result = Lazy.prime().take(5).toArray();
        expect(result).to.be.eql([2, 3, 5, 7, 11]);
    });
});
