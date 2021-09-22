import { expect } from "chai";
import Lazy from "../../src";
import { asyncGenerator } from "../helpers";

describe("ƒ max()", function () {
    it("should get the biggest number of all numbers", function () {
        const max = Lazy.from([1, 2, 3, 10, 4, 5, 6, -5, 7, 8, 9]).max();
        expect(max).to.be.equal(10);
    });

    it("should get the biggest number of all numbers from objects", function () {
        const max = Lazy.from([{ n: 2 }, { n: 4 }, { n: 1 }, { n: 3 }]).max((obj) => obj.n);
        expect(max).to.be.equal(4);
    });
});

describe("ƒ maxAsync()", function () {
    it("should get the biggest number of all numbers", async function () {
        const max = await Lazy.fromAsync(asyncGenerator([1, 2, 3, 10, 4, 5, 6, -5, 7, 8, 9])).max();
        expect(max).to.be.equal(10);
    });

    it("should get the biggest number of all numbers from objects", async function () {
        const max = await Lazy.fromAsync(asyncGenerator([{ n: 2 }, { n: 4 }, { n: 1 }, { n: 3 }])).max((obj) => obj.n);
        expect(max).to.be.equal(4);
    });
});
