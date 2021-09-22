import { expect } from "chai";
import Lazy from "../../src";

describe("ƒ random()", function () {
    it("should generate 100 numbers", function () {
        const result = Lazy.random({ max: 10 }).take(100).toArray();

        expect(result.length).to.be.equal(100);
        for (const number of result) {
            expect(number).to.satisfy(Number.isInteger);
            expect(number).to.be.greaterThanOrEqual(0);
            expect(number).to.be.lessThan(10);
        }
    });

    it("should generate 100 numbers in range [10, 20]", function () {
        const result = Lazy.random({ min: 10, max: 20 }).take(100).toArray();

        expect(result.length).to.be.equal(100);
        for (const number of result) {
            expect(number).to.satisfy(Number.isInteger);
            expect(number).to.be.greaterThanOrEqual(10);
            expect(number).to.be.lessThan(20);
        }
    });

    it("should generate 100 negative numbers in range [-20, -10]", function () {
        const result = Lazy.random({ min: -20, max: -10 }).take(100).toArray();

        expect(result.length).to.be.equal(100);
        for (const number of result) {
            expect(number).to.satisfy(Number.isInteger);
            expect(number).to.be.greaterThan(-20);
            expect(number).to.be.lessThanOrEqual(-10);
        }
    });

    it("should generate 100 floating point numbers in range [1, 2]", function () {
        const result = Lazy.random({ min: 1, max: 2, precision: 1 }).take(100).toArray();

        expect(result.length).to.be.equal(100);
        for (const number of result) {
            const valueAsString = number.toString();
            expect(valueAsString[0]).to.be.equal("1");
            expect([1, 3]).to.include(valueAsString.length)

            expect(number).to.be.greaterThanOrEqual(1);
            expect(number).to.be.lessThan(2);
        }
    });

    it("should generate 100 negative floating point numbers in range [-2, -1]", function () {
        const result = Lazy.random({ min: -2, max: -1, precision: 1 }).take(100).toArray();

        expect(result.length).to.be.equal(100);
        for (const number of result) {
            const valueAsString = number.toString();
            expect(valueAsString[0]).to.be.equal("-");

            expect(["1", "2"]).to.include(valueAsString[1]);
            expect([2, 4]).to.include(valueAsString.length);

            expect(number).to.be.greaterThanOrEqual(-2);
            expect(number).to.be.lessThanOrEqual(-1);
        }
    });

    it("should generate 5 equal negative numbers", function () {
        const result = Lazy.random({ min: -5, max: -5 }).take(5).toArray();
        expect(result).to.be.eql([-5, -5, -5, -5, -5]);
    });

    it("should generate 5 zeros", function () {
        const result = Lazy.random({ max: 0 }).take(5).toArray();
        expect(result).to.be.eql([0, 0, 0, 0, 0]);
    });
});
