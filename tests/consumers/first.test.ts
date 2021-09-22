import { expect } from "chai";
import Lazy from "../../src";
import { asyncGenerator } from "../helpers";

describe("ƒ first()", function () {
    it("should get the first element of the sequence", function () {
        const first = Lazy.from([1, 2, 3, 4, 5]).first();
        expect(first).to.be.equal(1);
    });

    it("should get the first even number", function () {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).first((n) => n % 2 === 0);
        expect(result).to.be.eql(2);
    });

    it("should get the first even number less than or equal to 5", function () {
        const result = Lazy.from([10, 9, 8, 7, 6, 7, 5, 4, 9]).first((n) => n <= 5);
        expect(result).to.be.eql(5);
    });

    it("should get the first record with searched prop value", function () {
        const result = Lazy.from([
            { a: "a", b: "b" },
            { a: "b", b: "b" },
            { a: "a", c: "c" },
            { a: "b", c: "c" },
            { a: "c", d: "d" },
        ]).first((o) => o.a === "c");

        expect(result).to.be.deep.eq({ a: "c", d: "d" });
    });
});

describe("ƒ firstAsync()", function () {
    it("should get the first element of the sequence", async function () {
        const first = await Lazy.fromAsync(asyncGenerator([1, 2, 3, 4, 5])).first();
        expect(first).to.be.equal(1);
    });

    it("should get the first even number", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).first((n) => n % 2 === 0);
        expect(result).to.be.eql(2);
    });

    it("should get the first even number less than or equal to 5", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([10, 9, 8, 7, 6, 7, 5, 4, 9])).first((n) => n <= 5);
        expect(result).to.be.eql(5);
    });

    it("should get the first record with searched prop value", async function () {
        const result = await Lazy.fromAsync(
            asyncGenerator([
                { a: "a", b: "b" },
                { a: "b", b: "b" },
                { a: "a", c: "c" },
                { a: "b", c: "c" },
                { a: "c", d: "d" },
            ])
        ).first((o) => o.a === "c");

        expect(result).to.be.deep.eq({ a: "c", d: "d" });
    });
});
