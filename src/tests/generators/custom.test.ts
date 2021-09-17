import { expect } from "chai";
import Lazy from "../../lazy";
import { asyncIterator } from "../helpers";

describe("ƒ custom()", function () {
    it("should double each number and the take the total sum", function () {
        const double = function* (iterator: Iterator<number, unknown, unknown>) {
            let x = iterator.next();

            while (x.done !== true) {
                yield x.value * 2;
                x = iterator.next();
            }
        };

        const result = Lazy.from([1, 2, 3, 4]).custom(double).sum();
        expect(result).to.be.equal(20);
    });
});

describe("ƒ customAsync()", function () {
    it("should double each number and the take the total sum", async function () {
        const double = async function* (iterator: AsyncIterator<number, unknown, unknown>) {
            let x = await iterator.next();

            while (x.done !== true) {
                yield x.value * 2;
                x = await iterator.next();
            }
        };

        const result = await Lazy.fromAsync(asyncIterator()).take(4).custom(double).sum();
        expect(result).to.be.equal(20);
    });
});
