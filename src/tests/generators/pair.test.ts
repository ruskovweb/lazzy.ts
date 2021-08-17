import { expect } from "chai";
import Lazy from "../..";

describe("ƒ pair()", function () {
    it("should return pairs of the array", function () {
        const pairs = Lazy.from([1, 2, 3]).pair().toArray();
        expect(pairs).to.be.deep.eq([
            [1, 2],
            [2, 3],
        ]);
    });

    it("should return an empty array for empty input", function () {
        const pairs = Lazy.from([]).pair().toArray();
        expect(pairs).to.be.eql([]);
    });
});
