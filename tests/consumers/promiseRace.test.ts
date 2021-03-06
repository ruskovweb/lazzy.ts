import { expect } from "chai";
import { delay } from "../../src/common/delay";
import Lazy from "../../src";

describe("ƒ promiseRace()", function () {
    it("should return the resolved value of the first promise if the first promise is resolved immediately", async function () {
        const p1 = async function () {
            return 1;
        };

        const p2 = async function () {
            return 2;
        };

        const result = await Lazy.from([p1(), p2(), 3, 4]).promiseRace();
        expect(result).to.be.deep.eq(1);
    });

    it("should return the resolved value of the second promise if the second promise is resolved first", async function () {
        const p1 = async function () {
            return delay(50, 1);
        };

        const p2 = async function () {
            return delay(20, 2);
        };

        const result = await Lazy.from([p1(), p2()]).promiseRace();
        expect(result).to.be.deep.eq(2);
    });

    it("should return the third value if the third value is not a promise", async function () {
        const p1 = async function () {
            return delay(100, 1);
        };

        const p2 = async function () {
            return delay(50, 2);
        };

        const result = await Lazy.from([p1(), p2(), 3, 4]).promiseRace();
        expect(result).to.be.deep.eq(3);
    });

    it("should return the first value if the sequence doesn't contain promises", async function () {
        const result = await Lazy.from([1, 2, 3, 4]).promiseRace();
        expect(result).to.be.deep.eq(1);
    });
});
