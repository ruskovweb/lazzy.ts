import { expect } from "chai";
import Lazy from "../..";
import { asyncGenerator } from "../helpers";

describe("ƒ indexOf()", function () {
    it("should return the proper index", function () {
        const index = Lazy.from([1, 2, 3, 4, 5, 6, 7, 5, 9, 10]).indexOf((v) => v === 5);
        expect(index).to.be.equal(4);
    });

    it("should return -1 if no matches found", function () {
        const index = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).indexOf((v) => v === 11);
        expect(index).to.be.equal(-1);
    });
});

describe("ƒ indexOfAsync()", function () {
    it("should return the proper index", async function () {
        const index = await Lazy.fromAsync(asyncGenerator([1, 2, 3, 4, 5, 6, 7, 5, 9, 10])).indexOf((v) => v === 5);
        expect(index).to.be.equal(4);
    });

    it("should return -1 if no matches found", async function () {
        const index = await Lazy.fromAsync(asyncGenerator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).indexOf((v) => v === 11);
        expect(index).to.be.equal(-1);
    });
});
