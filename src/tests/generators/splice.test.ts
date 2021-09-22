import { expect } from "chai";
import Lazy from "../..";
import { asyncIterator } from "../helpers";

describe("ƒ splice()", function() {
    it("should delete two numbers and add two new numbers", function() {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).splice(2, 2, 30, 40).toArray();
        expect(result).to.be.deep.eq([1, 2, 30, 40, 5, 6, 7, 8, 9]);
    });

    it("should delete two numbers and add four new numbers", function() {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).splice(2, 2, 30, 40, 50, 60).toArray();
        expect(result).to.be.deep.eq([1, 2, 30, 40, 50, 60, 5, 6, 7, 8, 9]);
    });

    it("should delete all after the second index and add two numbers", function() {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).splice(2, undefined, 30, 40).toArray();
        expect(result).to.be.deep.eq([1, 2, 30, 40]);
    });

    it("should delete all elements", function() {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).splice(0).toArray();
        expect(result).to.be.deep.eq([]);
    });

    it("should delete all elements if the start index is a negaive number", function() {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).splice(-1).toArray();
        expect(result).to.be.deep.eq([]);
    });
});

describe("ƒ spliceAsync()", function() {
    it("should delete two numbers and add two new numbers", async function() {
        const result = await Lazy.fromAsync(asyncIterator(9)).splice(2, 2, 30, Promise.resolve(40)).toArray();
        expect(result).to.be.deep.eq([1, 2, 30, 40, 5, 6, 7, 8, 9]);
    });

    it("should delete two numbers and add four new numbers", async function() {
        const result = await Lazy.fromAsync(asyncIterator(9)).splice(2, 2, 30, 40, 50, 60).toArray();
        expect(result).to.be.deep.eq([1, 2, 30, 40, 50, 60, 5, 6, 7, 8, 9]);
    });

    it("should delete all after the second index and add two numbers", async function() {
        const result = await Lazy.fromAsync(asyncIterator(9)).splice(2, undefined, 30, 40).toArray();
        expect(result).to.be.deep.eq([1, 2, 30, 40]);
    });

    it("should delete all elements", async function() {
        const result = await Lazy.fromAsync(asyncIterator(9)).splice(0).toArray();
        expect(result).to.be.deep.eq([]);
    });

    it("should delete all elements if the start index is a negaive number", async function() {
        const result = await Lazy.fromAsync(asyncIterator(9)).splice(-1).toArray();
        expect(result).to.be.deep.eq([]);
    });
});
