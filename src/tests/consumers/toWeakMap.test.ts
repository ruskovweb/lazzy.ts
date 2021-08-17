import { assert, expect } from "chai";
import Lazy from "../..";
import { primeGenerator } from "../helpers";

describe("ƒ toWeakMap()", function () {
    it("shoult convert iterator to a weak map", function () {
        let count = 0;
        const expected = Lazy.from(primeGenerator()).take(5).toArray();
        const keys = [{ n: "five" }, { n: "four" }, { n: "three" }, { n: "two" }, { n: "one" }];
        const result = Lazy.from(primeGenerator())
            .take(5)
            .toWeakMap((v) => [keys[count++], v]);

        assert.isTrue(result instanceof WeakMap);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            assert.isTrue(result.has(key));
            expect(result.get(key)).to.be.equal(expected[i]);
        }
    });
});
