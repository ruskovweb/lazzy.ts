import { expect } from "chai";
import Lazy from "../../src";
import { asyncGenerator } from "../helpers";

describe("ƒ average()", function () {
    it("should get the average value of three integer numbers", function () {
        const result = Lazy.from([1, 2, 3]).average();
        expect(result).to.be.equal(2);
    });

    it("should get the average value of four floating numbers", function () {
        const result = Lazy.from([1.1, 2.2, 3.3, 4.4]).average();
        expect(result).to.be.equal(2.75);
    });

    it("should get the average value of positive and negative numbers", function () {
        const result = Lazy.from([1, -3, 2, 3, 4, 5, -4, 6, -11, 7, 8, -5, 9, 10, -2]).average();
        expect(result).to.be.equal(2);
    });

    it("should get the average number of all numbers from objects", function () {
        const result = Lazy.from([{ n: 2 }, { n: 4 }, { n: 1 }, { n: 3 }]).average((obj) => obj.n);
        expect(result).to.be.equal(2.5);
    });
});

describe("ƒ averageAsync()", function () {
    it("should get the average value of three integer numbers", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([1, 2, 3])).average();
        expect(result).to.be.equal(2);
    });

    it("should get the average value of four floating numbers", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([1.1, 2.2, 3.3, 4.4])).average();
        expect(result).to.be.equal(2.75);
    });

    it("should get the average value of positive and negative numbers", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([1, -3, 2, 3, 4, 5, -4, 6, -11, 7, 8, -5, 9, 10, -2])).average();
        expect(result).to.be.equal(2);
    });

    it("should get the average number of all numbers from objects", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([{ n: 2 }, { n: 4 }, { n: 1 }, { n: 3 }])).average((obj) => obj.n);
        expect(result).to.be.equal(2.5);
    });
});
