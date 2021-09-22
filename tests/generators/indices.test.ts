import { expect } from "chai";
import Lazy from "../../src";
import { asyncGenerator, asyncIterator } from "../helpers";

describe("ƒ indices()", function () {
    it("should get the indices of all even numbers", function () {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .indices((n) => n % 2 === 0)
            .toArray();
        expect(result).to.be.eql([1, 3, 5, 7, 9]);
    });

    it("should get the indices of all numbers less than or equal to 5", function () {
        const result = Lazy.from([10, 2, 8, 1, 6, 7, 5, 4, 9])
            .indices((n) => n <= 5)
            .toArray();

        expect(result).to.be.eql([1, 3, 6, 7]);
    });
    it("should get the indices of all records with searched prop value", function () {
        const result = Lazy.from([
            { a: "a", b: "b" },
            { a: "b", b: "b" },
            { a: "a", c: "c" },
            { a: "b", c: "c" },
            { a: "c", d: "d" },
        ])
            .indices((o) => o.a === "a")
            .toArray();

        expect(result).to.be.eql([0, 2]);
    });
});

describe("ƒ indicesAsync()", function () {
    it("should get the indices of all even numbers", async function () {
        const result = await Lazy.fromAsync(asyncIterator(10))
            .indices((n) => n % 2 === 0)
            .toArray();
        expect(result).to.be.eql([1, 3, 5, 7, 9]);
    });

    it("should get the indices of all numbers less than or equal to 5", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([10, 2, 8, 1, 6, 7, 5, 4, 9]))
            .indices((n) => n <= 5)
            .toArray();

        expect(result).to.be.eql([1, 3, 6, 7]);
    });
    it("should get the indices of all records with searched prop value", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([
            { a: "a", b: "b" },
            { a: "b", b: "b" },
            { a: "a", c: "c" },
            { a: "b", c: "c" },
            { a: "c", d: "d" },
        ]))
            .indices((o) => o.a === "a")
            .toArray();

        expect(result).to.be.eql([0, 2]);
    });
});
