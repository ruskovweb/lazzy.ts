import { expect } from "chai";
import Lazy from "../..";
import { asyncGenerator, asyncIterator } from "../helpers";

describe("ƒ filterWithIndex()", function () {
    it("should filter only even numbers", function () {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .filterWithIndex((n) => n % 2 === 0)
            .toArray();
        expect(result).to.be.deep.eq([
            [2, 1],
            [4, 3],
            [6, 5],
            [8, 7],
            [10, 9],
        ]);
    });

    it("should filter all numbers less than or equal to 5", function () {
        const result = Lazy.from([10, 2, 8, 1, 6, 7, 5, 4, 9])
            .filterWithIndex((n) => n <= 5)
            .toArray();
        expect(result).to.be.deep.eq([
            [2, 1],
            [1, 3],
            [5, 6],
            [4, 7],
        ]);
    });

    it("should filter all records with same prop value", function () {
        const result = Lazy.from([
            { a: "a", b: "b" },
            { a: "b", b: "b" },
            { a: "a", c: "c" },
            { a: "b", c: "c" },
            { a: "c", d: "d" },
        ])
            .filterWithIndex((o) => o.a === "a")
            .toArray();

        expect(result).to.be.deep.eq([
            [{ a: "a", b: "b" }, 0],
            [{ a: "a", c: "c" }, 2],
        ]);
    });
});

describe("ƒ filterWithIndexAsync()", function () {
    it("should filter only even numbers", async function () {
        const result = await Lazy.fromAsync(asyncIterator())
            .take(10)
            .filterWithIndex((n) => n % 2 === 0)
            .toArray();
        expect(result).to.be.deep.eq([
            [2, 1],
            [4, 3],
            [6, 5],
            [8, 7],
            [10, 9],
        ]);
    });

    it("should filter all numbers less than or equal to 5", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([10, 2, 8, 1, 6, 7, 5, 4, 9]))
            .filterWithIndex((n) => n <= 5)
            .toArray();
        expect(result).to.be.deep.eq([
            [2, 1],
            [1, 3],
            [5, 6],
            [4, 7],
        ]);
    });

    it("should filter all records with same prop value", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([
            { a: "a", b: "b" },
            { a: "b", b: "b" },
            { a: "a", c: "c" },
            { a: "b", c: "c" },
            { a: "c", d: "d" },
        ]))
            .filterWithIndex((o) => o.a === "a")
            .toArray();

        expect(result).to.be.deep.eq([
            [{ a: "a", b: "b" }, 0],
            [{ a: "a", c: "c" }, 2],
        ]);
    });
});
