import { expect } from "chai";
import Lazy from "../../src";
import { asyncGenerator } from "../helpers";

describe("ƒ min()", function () {
    it("should get the smallest number of all numbers", function () {
        const min = Lazy.from([1, 2, 3, 4, 5, 6, -5, 7, 8, 9, 10]).min();
        expect(min).to.be.equal(-5);
    });

    it("should get the smallest number of all numbers from objects", function () {
        const min = Lazy.from([{ n: 2 }, { n: 4 }, { n: 1 }, { n: 3 }]).min((obj) => obj.n);
        expect(min).to.be.equal(1);
    });
});

describe("ƒ minAsync()", function () {
    it("should get the smallest number of all numbers", async function () {
        const min = await Lazy.fromAsync(asyncGenerator([1, 2, 3, 4, 5, 6, -5, 7, 8, 9, 10])).min();
        expect(min).to.be.equal(-5);
    });

    it("should get the smallest number of all numbers from objects", async function () {
        const min = await Lazy.fromAsync(asyncGenerator([{ n: 2 }, { n: 4 }, { n: 1 }, { n: 3 }])).min((obj) => obj.n);
        expect(min).to.be.equal(1);
    });
});
