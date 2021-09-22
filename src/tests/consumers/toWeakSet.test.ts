import { assert } from "chai";
import Lazy from "../..";
import { asyncGenerator } from "../helpers";

describe("ƒ toWeakSet()", function () {
    it("shoult convert iterator to a weak map", function () {
        const keys = [{ n: "five" }, { n: "four" }, { n: "three" }, { n: "two" }, { n: "one" }];
        const result = Lazy.from(keys).toWeakSet();

        assert.isTrue(result instanceof WeakSet);
        for (const key of keys) {
            assert.isTrue(result.has(key));
        }
    });
});

describe("ƒ toWeakSet()", function () {
    it("shoult convert iterator to a weak map", async function () {
        const keys = [{ n: "five" }, { n: "four" }, { n: "three" }, { n: "two" }, { n: "one" }];
        const result = await Lazy.fromAsync(asyncGenerator(keys)).toWeakSet();

        assert.isTrue(result instanceof WeakSet);
        for (const key of keys) {
            assert.isTrue(result.has(key));
        }
    });
});
