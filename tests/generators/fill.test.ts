import { expect } from "chai";
import Lazy from "../../src/lazy";
import { asyncIterator } from "../helpers";

describe("ƒ fill()", function() {
    it("shoud fill the sequence with zeros, between the 3th and the 5th index", function() {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7]).fill([0], 3, 5).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 0, 0, 6, 7]);
    });

    it("shoud fill the sequence with zeros, from the 3th index to the end", function() {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7]).fill([0], 3).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 0, 0, 0, 0]);
    });

    it("shoud fill the entire sequence with zeros, if the start index is a negative number", function() {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7]).fill([0], -5).toArray();
        expect(result).to.be.deep.eq([0, 0, 0, 0, 0, 0, 0]);
    });

    it("shoud fill the entire sequence with zeros, if the start is 0 and the end is equal to the length of the array", function() {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7]).fill([0], 0, 7).toArray();
        expect(result).to.be.deep.eq([0, 0, 0, 0, 0, 0, 0]);
    });

    it("shoud fill the entire sequence with repeated values [8, 9, 10], if the start index is 0 and the end index is 7", function() {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7]).fill([8, 9, 10], 0, 7).toArray();
        expect(result).to.be.deep.eq([8, 9, 10, 8, 9, 10, 8]);
    });

    it("shoud fill the last three elements of the sequence with [8, 9, 10]", function() {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7]).fill([8, 9, 10], 4, 7).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 8, 9, 10]);
    });

    it("shoud fill the sequence with [8, 9] at positions 4 and 5", function() {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7]).fill([8, 9, 10], 3, 5).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 8, 9, 6, 7]);
    });

    it("shoud fill the last two elements of the sequence with [8, 9]", function() {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7]).fill([8, 9, 10], 5, 7).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 8, 9]);
    });

    it("shoud fill the last two elements of the sequence with [8, 9], if the 'end' index is greater than the array size", function() {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7]).fill([8, 9, 10], 5, 10).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 8, 9]);
    });
});

describe("ƒ fillAsync()", function() {
    it("shoud fill the sequence with zeros, between the 3th and the 5th index", async function() {
        const result = await Lazy.fromAsync(asyncIterator()).fill([0], 3, 5).take(7).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 0, 0, 6, 7]);
    });

    it("shoud fill the first async iterable with values from the second async iterable", async function() {
        const iterable = {
            [Symbol.asyncIterator]: asyncIterator
        };

        const result = await Lazy.fromAsync(iterable).fill(iterable, 5).take(10).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
    });

    it("shoud fill the sequence with zeros, from the 3th index to the end", async function() {
        const result = await Lazy.fromAsync(asyncIterator()).fill([0], 3).take(7).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 0, 0, 0, 0]);
    });

    it("shoud fill the entire sequence with zeros, if the start index is a negative number", async function() {
        const result = await Lazy.fromAsync(asyncIterator()).fill([0], -5).take(7).toArray();
        expect(result).to.be.deep.eq([0, 0, 0, 0, 0, 0, 0]);
    });

    it("shoud fill the entire sequence with zeros, if the start is 0 and the end is equal to the length of the array", async function() {
        const result = await Lazy.fromAsync(asyncIterator()).fill([0], 0, 7).take(7).toArray();
        expect(result).to.be.deep.eq([0, 0, 0, 0, 0, 0, 0]);
    });

    it("shoud fill the entire sequence with repeated values [8, 9, 10], if the start index is 0 and the end index is 7", async function() {
        const result = await Lazy.fromAsync(asyncIterator()).fill([8, 9, 10], 0, 7).take(7).toArray();
        expect(result).to.be.deep.eq([8, 9, 10, 8, 9, 10, 8]);
    });

    it("shoud fill the last three elements of the sequence with [8, 9, 10]", async function() {
        const result = await Lazy.fromAsync(asyncIterator()).fill([8, 9, 10], 4, 7).take(7).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 8, 9, 10]);
    });

    it("shoud fill the sequence with [8, 9] at positions 4 and 5", async function() {
        const result = await Lazy.fromAsync(asyncIterator()).fill([8, 9, 10], 3, 5).take(7).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 8, 9, 6, 7]);
    });

    it("shoud fill the last two elements of the sequence with [8, 9]", async function() {
        const result = await Lazy.fromAsync(asyncIterator()).fill([8, 9, 10], 5, 7).take(7).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 8, 9]);
    });

    it("shoud fill the last two elements of the sequence with [8, 9], if the 'end' index is greater than the array size", async function() {
        const result = await Lazy.fromAsync(asyncIterator()).fill([8, 9, 10], 5, 10).take(7).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 8, 9]);
    });
});
