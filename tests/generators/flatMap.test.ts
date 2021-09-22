import { expect } from "chai";
import Lazy from "../../src";
import { asyncGenerator } from "../helpers";

describe("ƒ flatMap()", function () {
    it("should multiple each number and append it to the original value, then should flat the array", function () {
        const array = [1, 2, 3, 4];
        const flatten = Lazy.from(array)
            .flatMap((x) => [x, x * 2])
            .toArray();
        expect(flatten).to.be.eql([1, 2, 2, 4, 3, 6, 4, 8]);
    });

    it("should double each number and flat the array", function () {
        const array = [1, 2, 3, 4];
        const flatten = Lazy.from(array)
            .flatMap((x) => [x * 2])
            .toArray();
        expect(flatten).to.be.eql([2, 4, 6, 8]);
    });

    it("should double each number in two dimensional array and flat the array with one level of depth", function () {
        const array = [1, 2, 3, 4];
        const flatten = Lazy.from(array)
            .flatMap((x) => [[x * 2]], 1)
            .toArray();
        expect(flatten).to.be.eql([[2], [4], [6], [8]]);
    });

    it("should double each number in five dimensional array and flat the array with two levels of depth", function () {
        const array = [1, 2, 3, 4];
        const flatten = Lazy.from(array)
            .flatMap((x) => [[[[[x * 2]]]]], 2)
            .toArray();
        expect(flatten).to.be.eql([[[[2]]], [[[4]]], [[[6]]], [[[8]]]]);
    });

    it("should double each number in five dimensional array and flat the array with all levels of depth", function () {
        const array = [1, 2, 3, 4];
        const flatten = Lazy.from(array)
            .flatMap((x) => [[[[[x * 2]]]]])
            .toArray();
        expect(flatten).to.be.eql([2, 4, 6, 8]);
    });

    it("should split all strings in array then should flat with one level of depth", function () {
        const array = ["it's Sunny in", "", "California"];
        const flatten = Lazy.from(array)
            .flatMap((x) => x.split(" "))
            .toArray();
        expect(flatten).to.be.eql(["it's", "Sunny", "in", "", "California"]);
    });

    it("should add and remove numbers by criteria, then should flat with one level of depth", function () {
        const array = [5, 4, -3, 20, 17, -33, -4, 18];
        const flatten = Lazy.from(array)
            .flatMap((n) => (n < 0 ? [] : n % 2 === 0 ? [n] : [n - 1, 1]))
            .toArray();
        expect(flatten).to.be.eql([4, 1, 4, 20, 16, 1, 18]);
    });
});

describe("ƒ flatMapAsync()", function () {
    it("should multiple each number and append it to the original value, then should flat the array", async function () {
        const array = [1, 2, 3, 4];
        const flatten = await Lazy.fromAsync(asyncGenerator(array))
            .flatMap((x) => [x, x * 2])
            .toArray();
        expect(flatten).to.be.eql([1, 2, 2, 4, 3, 6, 4, 8]);
    });

    it("should double each number and flat the array", async function () {
        const array = [1, 2, 3, 4];
        const flatten = await Lazy.fromAsync(asyncGenerator(array))
            .flatMap((x) => [x * 2])
            .toArray();
        expect(flatten).to.be.eql([2, 4, 6, 8]);
    });

    it("should double each number in two dimensional array and flat the array with one level of depth", async function () {
        const array = [1, 2, 3, 4];
        const flatten = await Lazy.fromAsync(asyncGenerator(array))
            .flatMap((x) => [[x * 2]], 1)
            .toArray();
        expect(flatten).to.be.eql([[2], [4], [6], [8]]);
    });

    it("should double each number in five dimensional array and flat the array with two levels of depth", async function () {
        const array = [1, 2, 3, 4];
        const flatten = await Lazy.fromAsync(asyncGenerator(array))
            .flatMap((x) => [[[[[x * 2]]]]], 2)
            .toArray();
        expect(flatten).to.be.eql([[[[2]]], [[[4]]], [[[6]]], [[[8]]]]);
    });

    it("should double each number in five dimensional array and flat the array with all levels of depth", async function () {
        const array = [1, 2, 3, 4];
        const flatten = await Lazy.fromAsync(asyncGenerator(array))
            .flatMap((x) => [[[[[x * 2]]]]])
            .toArray();
        expect(flatten).to.be.eql([2, 4, 6, 8]);
    });

    it("should split all strings in array then should flat with one level of depth", async function () {
        const array = ["it's Sunny in", "", "California"];
        const flatten = await Lazy.fromAsync(asyncGenerator(array))
            .flatMap((x) => x.split(" "))
            .toArray();
        expect(flatten).to.be.eql(["it's", "Sunny", "in", "", "California"]);
    });

    it("should add and remove numbers by criteria, then should flat with one level of depth", async function () {
        const array = [5, 4, -3, 20, 17, -33, -4, 18];
        const flatten = await Lazy.fromAsync(asyncGenerator(array))
            .flatMap((n) => (n < 0 ? [] : n % 2 === 0 ? [n] : [n - 1, 1]))
            .toArray();
        expect(flatten).to.be.eql([4, 1, 4, 20, 16, 1, 18]);
    });
});
