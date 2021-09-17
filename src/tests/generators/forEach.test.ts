import { expect } from "chai";
import Lazy from "../..";
import { asyncGenerator, asyncIterator } from "../helpers";

describe("ƒ forEach()", function () {
    it("should iterate through each value", function () {
        const array = [1, 2, 3];
        const result: number[] = [];

        Lazy.from(array)
            .forEach((v, i) => (result[i] = v))
            .run();

        expect(array).to.be.eql([1, 2, 3]); // Asserts that the original array is not modified
        expect(result).to.be.eql(array);
    });
});

describe("ƒ forEachAsync()", function () {
    it("should iterate through each value", async function () {
        const array = [1, 2, 3];
        const result: number[] = [];

        await Lazy.fromAsync(asyncIterator())
            .take(3)
            .forEach((v, i) => {
                result[i] = v;
            })
            .run();

        expect(array).to.be.eql([1, 2, 3]); // Asserts that the original array is not modified
        expect(result).to.be.eql(array);
    });
});
