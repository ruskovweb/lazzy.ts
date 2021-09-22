import { expect } from "chai";
import Lazy from "../..";
import { asyncGenerator } from "../helpers";

describe("ƒ partition()", function () {
    it("should split the array into two parts", function () {
        const partition = Lazy.from([1, 2, 3, 4]).partition((n) => n % 2 === 0);
        expect(partition).to.be.deep.eq([
            [2, 4],
            [1, 3],
        ]);
    });

    it("should return two empty arrays if the iterator is empty", function () {
        const partition = Lazy.from([]).partition((n) => n % 2 === 0);
        expect(partition).to.be.deep.eq([[], []]);
    });
});

describe("ƒ partitionAsync()", function () {
    it("should split the array into two parts", async function () {
        const partition = await Lazy.fromAsync(asyncGenerator([1, 2, 3, 4])).partition((n) => n % 2 === 0);
        expect(partition).to.be.deep.eq([
            [2, 4],
            [1, 3],
        ]);
    });

    it("should return two empty arrays if the iterator is empty", async function () {
        const partition = await Lazy.fromAsync(asyncGenerator([])).partition((n) => n % 2 === 0);
        expect(partition).to.be.deep.eq([[], []]);
    });
});
