import { expect } from "chai";
import Lazy from "../../src";
import { asyncGenerator, asyncIterator } from "../helpers";

describe("ƒ filter()", function () {
    it("should filter only even numbers", function () {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .filter((n) => n % 2 === 0)
            .toArray();
        expect(result).to.be.eql([2, 4, 6, 8, 10]);
    });

    it("should filter all numbers less than or equal to 5", function () {
        const result = Lazy.from([10, 2, 8, 1, 6, 7, 5, 4, 9])
            .filter((n) => n <= 5)
            .toArray();
        expect(result).to.be.eql([2, 1, 5, 4]);
    });

    it("should filter all records with same prop value", function () {
        const source = [
            { a: "a", b: "b" },
            { a: "b", b: "b" },
            { a: "a", c: "c" },
            { a: "b", c: "c" },
            { a: "c", d: "d" },
        ];

        const result = Lazy.from(source)
            .filter((o) => o.a === "a")
            .toArray();
        expect(result).to.be.deep.eq([
            { a: "a", b: "b" },
            { a: "a", c: "c" },
        ]);
    });
});

describe("ƒ filterAsync()", function () {
    it("should filter only even numbers", async function () {
        const result = await Lazy.fromAsync(asyncIterator())
            .take(10)
            .filter((n) => n % 2 === 0)
            .toArray();
        expect(result).to.be.eql([2, 4, 6, 8, 10]);
    });

    it("should filter all numbers less than or equal to 5", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([10, 2, 8, 1, 6, 7, 5, 4, 9]))
            .filter((n) => n <= 5)
            .toArray();
        expect(result).to.be.eql([2, 1, 5, 4]);
    });

    it("should filter all records with same prop value", async function () {
        const source = [
            { a: "a", b: "b" },
            { a: "b", b: "b" },
            { a: "a", c: "c" },
            { a: "b", c: "c" },
            { a: "c", d: "d" },
        ];

        const result = await Lazy.fromAsync(asyncGenerator(source))
            .filter((o) => o.a === "a")
            .toArray();
        expect(result).to.be.deep.eq([
            { a: "a", b: "b" },
            { a: "a", c: "c" },
        ]);
    });
});
