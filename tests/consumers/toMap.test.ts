import { assert, expect } from "chai";
import Lazy from "../../src";
import { primesAsync } from "../helpers";

describe("ƒ toMap()", function () {
    it("shoult convert iterator to a map", function () {
        const result = Lazy.prime()
            .take(5)
            .toMap((v) => [v.toString(), v]);

        assert.isTrue(result instanceof Map);
        expect(result.size).to.be.equal(5);
        expect(Array.from(result)).to.be.eql([
            ["2", 2],
            ["3", 3],
            ["5", 5],
            ["7", 7],
            ["11", 11],
        ]);
    });
});

describe("ƒ toMapAsync()", function () {
    it("shoult convert iterator to a map", async function () {
        const result = await Lazy.generateAsync(primesAsync()).take(5).toMap((v) => [v.toString(), v]);

        assert.isTrue(result instanceof Map);
        expect(result.size).to.be.equal(5);
        expect(Array.from(result)).to.be.eql([
            ["2", 2],
            ["3", 3],
            ["5", 5],
            ["7", 7],
            ["11", 11],
        ]);
    });
});
