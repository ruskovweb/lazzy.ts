import { expect } from "chai";
import { delay } from "../../common/delay";
import Lazy from "../..";
import { asyncGenerator } from "../helpers";

describe("ƒ promiseAll()", function () {
    it("should resolve all promises and return them in the same order", async function () {
        const p1 = async function () {
            return 1;
        }

        const p2 = async function () {
            return 2;
        }

        const result = await Lazy.from([p1(), p2(), 3, 4]).promiseAll();
        expect(result).to.be.deep.eq([1, 2, 3, 4]);
    });

    it("should resolve only the promises and return all values in the same order", async function () {
        const p1 = async function () {
            return delay(100, 1);
        }

        const p2 = async function () {
            return delay(50, 2);
        }

        const result = await Lazy.from([p1(), p2(), 3, 4]).promiseAll();
        expect(result).to.be.deep.eq([1, 2, 3, 4]);
    });

    it("should return the same array if it does not contain promises", async function () {
        const result = await Lazy.from([1, 2, 3, 4]).promiseAll();
        expect(result).to.be.deep.eq([1, 2, 3, 4]);
    });
});

describe("ƒ promiseAllAsync()", function () {
    it("should resolve all promises and return them in the same order", async function () {
        const p1 = async function () {
            return 1;
        }

        const p2 = async function () {
            return 2;
        }

        const result = await Lazy.fromAsync(asyncGenerator([p1(), p2(), 3, 4])).promiseAll();
        expect(result).to.be.deep.eq([1, 2, 3, 4]);
    });

    it("should resolve only the promises and return all values in the same order", async function () {
        const p1 = async function () {
            return delay(100, 1);
        }

        const p2 = async function () {
            return delay(50, 2);
        }

        const result = await Lazy.fromAsync(asyncGenerator([p1(), p2(), 3, 4])).promiseAll();
        expect(result).to.be.deep.eq([1, 2, 3, 4]);
    });

    it("should return the same array if it does not contain promises", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([1, 2, 3, 4])).promiseAll();
        expect(result).to.be.deep.eq([1, 2, 3, 4]);
    });
});
