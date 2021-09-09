import { expect } from "chai";
import { delay } from "../../common/delay";
import Lazy from "../..";

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
            await delay(100);
            return 1;
        }

        const p2 = async function () {
            await delay(50);
            return 2;
        }

        const result = await Lazy.from([p1(), p2(), 3, 4]).promiseAll();
        expect(result).to.be.deep.eq([1, 2, 3, 4]);
    });

    it("should return the same array if it does not contain promises", async function () {
        const result = await Lazy.from([1, 2, 3, 4]).promiseAll();
        expect(result).to.be.deep.eq([1, 2, 3, 4]);
    });

    it("should resolve an async iterator of with promises and return them in the same order", async function () {
        const it = function(): AsyncIterator<Promise<number>> {
            let num = 1;
            return {
                next: async function() {
                    return { done: false, value: Promise.resolve(num++) }
                } 
            }
        }

        const result = await Lazy.fromAsync(it()).take(4).promiseAll();
        expect(result).to.be.deep.eq([1, 2, 3, 4]);
    });
});
