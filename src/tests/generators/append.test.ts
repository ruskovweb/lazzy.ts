import { expect } from "chai";
import Lazy from "../..";
import { asyncGenerator, asyncIterator } from "../helpers";

describe("ƒ append()", function () {
    it("should append an array", function () {
        const result = Lazy.from([1, 2, 3, 4, 5]).append([6, 7, 8, 9, 10]).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should append multiple arrays", function () {
        const result = Lazy.from([1, 2, 3, 4, 5])
            .append([6, 7], new Set([8, 9, 10]))
            .toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should append multiple arrays for chained calls", function () {
        const result = Lazy.from([1, 2, 3, 4, 5]).append([6, 7]).append([8, 9, 10]).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should append 5 numbers to 5 randomly generated numbers", function () {
        const result = Lazy.random({ min: -5, max: 0 }).take(5).append([1, 2, 3, 4, 5]).toArray();

        for (let i = 0; i < 5; i++) {
            const n = result[i];
            expect(n).to.satisfy(Number.isInteger);
            expect(n).to.be.greaterThanOrEqual(-5);
            expect(n).to.be.lessThanOrEqual(0);
        }

        expect(result.slice(-5)).to.be.deep.eq([1, 2, 3, 4, 5]);
    });

    it("should append 5 circular numbers to 5 randomly generated numbers", function () {
        const circular = Lazy.circular([1, 2]);

        const result = Lazy.random({ min: -5, max: 0 }).take(5).append(circular).take(10).toArray();

        for (let i = 0; i < 5; i++) {
            const n = result[i];
            expect(n).to.satisfy(Number.isInteger);
            expect(n).to.be.greaterThanOrEqual(-5);
            expect(n).to.be.lessThanOrEqual(0);
        }

        expect(result.slice(-5)).to.be.deep.eq([1, 2, 1, 2, 1]);
    });

    it("should append 5 circular numbers to 5 randomly generated numbers", function () {
        const circular = Lazy.circular([1, 2]).take(5);
        const random = Lazy.random({ min: -5, max: 0 }).take(5);
        const result = random.append(circular).toArray();

        for (let i = 0; i < 5; i++) {
            const n = result[i];
            expect(n).to.satisfy(Number.isInteger);
            expect(n).to.be.greaterThanOrEqual(-5);
            expect(n).to.be.lessThanOrEqual(0);
        }

        expect(result.slice(-5)).to.be.deep.eq([1, 2, 1, 2, 1]);
    });
});

describe("ƒ appendAsync()", function () {
    it("should append an array", async function () {
        const result = await Lazy.fromAsync(asyncIterator()).take(5).append([6, 7, 8, 9, 10]).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should append an array of promises", async function () {
        const result = await Lazy.fromAsync(asyncIterator())
            .take(5)
            .append([Promise.resolve(6), Promise.resolve(7), Promise.resolve(8), Promise.resolve(9), Promise.resolve(10)])
            .toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should append an async iterator", async function () {
        const result = await Lazy.fromAsync(asyncIterator()).take(5).append(asyncGenerator([6, 7, 8, 9, 10])).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should append an array and an async iterator", async function () {
        const result = await Lazy.fromAsync(asyncIterator()).take(5).append(asyncGenerator([6, 7, 8, 9, 10]), [11, 12, 13, 14, 15]).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    });

    it("should append multiple iterables for chained calls", async function () {
        const result = await Lazy.fromAsync(asyncIterator()).take(5).append(asyncGenerator([6, 7, 8, 9, 10])).append([11, 12, 13, 14, 15]).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    });

    it("should append nothing", async function () {
        const result = await Lazy.fromAsync(asyncIterator()).take(5).append().toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5]);
    });

    it("should return an empty array", async function () {
        const result = await Lazy.fromAsync(asyncIterator()).take(0).append().toArray();
        expect(result).to.be.deep.eq([]);
    });
});
