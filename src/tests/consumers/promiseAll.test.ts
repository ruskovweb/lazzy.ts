import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

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

    it("should reject if some promise reject too", async function () {
        const p1 = async function () {
            throw new Error("Another error");
        }

        const p2 = async function () {
            throw new Error("Some error");
        }

        expect(Lazy.from([p1(), p2(), 3, 4]).promiseAll()).to.be.rejectedWith(Error("Some error"));
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

    it("should reject if some promise reject too", async function () {
        const p1 = async function () {
            throw new Error("Another error");
        }

        const p2 = async function () {
            throw new Error("Some error");
        }

        expect(Lazy.fromAsync(asyncGenerator([p1(), p2(), 3, 4])).promiseAll()).to.be.rejectedWith(Error("Some error"));
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
