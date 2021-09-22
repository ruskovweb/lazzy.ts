import { expect, assert } from "chai";
import Lazy from "../..";
import { asyncGenerator } from "../helpers";

describe("ƒ firstWithIndex()", function () {
    it("should get the first even number with index", function () {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).firstWithIndex((n) => n % 2 === 0);
        expect(result).to.be.eql([2, 1]);
    });

    it("should get the first even number with index which is less than or equal to 5", function () {
        const result = Lazy.from([10, 8, 9, 6, 7, 5, 4, 9]).firstWithIndex((n) => n <= 5);
        expect(result).to.be.eql([5, 5]);
    });

    it("should get the first record with index for searched prop value", function () {
        const result = Lazy.from([
            { a: "a", b: "b" },
            { a: "b", b: "b" },
            { a: "a", c: "c" },
            { a: "b", c: "c" },
            { a: "c", d: "d" },
        ]).firstWithIndex((o) => o.a === "c");

        expect(result).to.be.deep.eq([{ a: "c", d: "d" }, 4]);
    });

    it("should return [undefined, -1] if the value is not found", function () {
        const [value, index] = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"]).firstWithIndex((e) => e.startsWith("K"));
        assert.isUndefined(value);
        expect(index).to.be.equal(-1);
    });
});

describe("ƒ firstWithIndexAsync()", function () {
    it("should get the first even number with index", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).firstWithIndex((n) => n % 2 === 0);
        expect(result).to.be.eql([2, 1]);
    });

    it("should get the first even number with index which is less than or equal to 5", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([10, 8, 9, 6, 7, 5, 4, 9])).firstWithIndex((n) => n <= 5);
        expect(result).to.be.eql([5, 5]);
    });

    it("should get the first record with index for searched prop value", async function () {
        const result = await Lazy.fromAsync(
            asyncGenerator([
                { a: "a", b: "b" },
                { a: "b", b: "b" },
                { a: "a", c: "c" },
                { a: "b", c: "c" },
                { a: "c", d: "d" },
            ])
        ).firstWithIndex((o) => o.a === "c");

        expect(result).to.be.deep.eq([{ a: "c", d: "d" }, 4]);
    });

    it("should return [undefined, -1] if the value is not found", async function () {
        const [value, index] = await Lazy.fromAsync(asyncGenerator(["Josh", "Michael", "Jonathan", "Bob"])).firstWithIndex((e) => e.startsWith("K"));
        assert.isUndefined(value);
        expect(index).to.be.equal(-1);
    });
});
