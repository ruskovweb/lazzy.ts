import { expect } from "chai";
import Lazy from "../../src";

describe("ƒ fibonacci()", function() {
    it("should generate the first 10 numbers from the fibonacci sequence", function() {
        const fibonacci = Lazy.fibonacci().take(10).toArray();
        expect(fibonacci).to.be.deep.eq([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });

    it("should generate 10 numbers from the fibonacci sequence started from specific minimum", function() {
        const fibonacci = Lazy.fibonacci(10).take(10).toArray();
        expect(fibonacci).to.be.deep.eq([13, 21, 34, 55, 89, 144, 233, 377, 610, 987]);
    });

    it("should skip 10 and generate 10 numbers from the fibonacci sequence", function() {
        const fibonacci = Lazy.fibonacci().skip(10).take(10).toArray();
        expect(fibonacci).to.be.deep.eq([ 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]);
    });
});
