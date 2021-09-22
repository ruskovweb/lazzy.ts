import { expect } from "chai";
import Lazy from "../../src";
import { primesAsync } from "../helpers";

describe("ƒ toArray()", function () {
    it("shoult convert iterator to an array", function () {
        const result = Lazy.prime().take(5).toArray();
        expect(result).to.be.eql([2, 3, 5, 7, 11]);
    });
});

describe("ƒ toArrayAsync()", function () {
    it("shoult convert iterator to an array", async function () {
        const result = await Lazy.generateAsync(primesAsync()).take(5).toArray();
        expect(result).to.be.eql([2, 3, 5, 7, 11]);
    });
});
