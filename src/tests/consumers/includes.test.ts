import { assert } from "chai";
import Lazy from "../..";

describe("ƒ includes()", function () {
    it("should return true if find match", function () {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).includes((n) => n === 5);
        assert.isTrue(result);
    });

    it("should return false if don't find match", function () {
        const result = Lazy.from([1, 2, 3, 4, 6, 7, 8, 9, 10]).includes((n) => n === 5);
        assert.isFalse(result);
    });

    it("shoshould return false for empty array", function () {
        const result = Lazy.from([]).includes((n) => n === 5);
        assert.isFalse(result);
    });
});
