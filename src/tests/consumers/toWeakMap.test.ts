import { assert, expect } from "chai";
import Lazy from "../..";
import { primesAsync } from "../helpers";

describe("ƒ toWeakMap()", function () {
    it("shoult convert iterator to a weak map", function () {
        let count = 0;
        const expected = Lazy.prime().take(5).toArray();
        const keys = [{ n: "five" }, { n: "four" }, { n: "three" }, { n: "two" }, { n: "one" }];
        const result = Lazy.prime()
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

describe("ƒ toWeakMapAsync()", function () {
    it("shoult convert iterator to a weak map", async function () {
        let count = 0;
        const expected = Lazy.prime().take(5).toArray();
        const keys = [{ n: "five" }, { n: "four" }, { n: "three" }, { n: "two" }, { n: "one" }];
        const result = await Lazy.generateAsync(primesAsync())
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
