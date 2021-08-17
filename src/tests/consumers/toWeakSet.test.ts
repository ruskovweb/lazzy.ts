import { assert } from "chai";
import Lazy from "../..";

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
