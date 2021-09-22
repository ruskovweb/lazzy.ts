import { assert } from "chai";
import Lazy from "../../src";
import { asyncGenerator } from "../helpers";

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

describe("ƒ includesAsync()", function () {
    it("should return true if find match", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).includes((n) => n === 5);
        assert.isTrue(result);
    });

    it("should return false if don't find match", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([1, 2, 3, 4, 6, 7, 8, 9, 10])).includes((n) => n === 5);
        assert.isFalse(result);
    });

    it("shoshould return false for empty array", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([])).includes((n) => n === 5);
        assert.isFalse(result);
    });
});
