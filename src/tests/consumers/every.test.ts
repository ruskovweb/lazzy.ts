import { assert } from "chai";
import Lazy from "../..";

describe("ƒ every()", function () {
    it("should return 'true' if all values satisfy the condition", function () {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).every(n => n <= 10);
        assert.isTrue(result);
    });

    it("should return 'false' if all values satisfy the condition", function () {
        const result = Lazy.from([1, 2, 3, 4, 11, 5, 6, 7, 8, 9, 10]).every(n => n <= 10);
        assert.isFalse(result);
    });
});
