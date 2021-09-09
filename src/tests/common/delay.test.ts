import { expect } from "chai";
import { delay } from "../../common/delay";

describe("ƒ delay()", function() {
    it("should return the fastest promise", async function() {
        const promises = [delay(160, 1), delay(80, 2), delay(40, 3)];
        const result = await Promise.race(promises);
        expect(result).to.be.equal(3);
    })
});
