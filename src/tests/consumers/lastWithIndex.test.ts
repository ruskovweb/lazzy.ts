import { assert, expect } from "chai";
import Lazy from "../..";

describe("ƒ lastWithIndex()", function () {
    it("should get the last even number with index", function () {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).lastWithIndex((n) => n % 2 === 0);
        expect(result).to.be.eql([10, 9]);
    });

    it("should get the last even number with index which is less than or equal to 5", function () {
        const result = Lazy.from([10, 1, 8, 3, 6, 7, 5, 2, 9]).lastWithIndex((n) => n <= 5);
        expect(result).to.be.eql([2, 7]);
    });

    it("should get the last record with index for searched prop value", function () {
        const result = Lazy.from([
            { a: "a", b: "b" },
            { a: "b", b: "b" },
            { a: "a", c: "c" },
            { a: "b", c: "c" },
            { a: "c", d: "d" },
        ]).lastWithIndex((o) => o.a === "b");

        expect(result).to.be.deep.eq([{ a: "b", c: "c" }, 3]);
    });
    
    it("should return [undefined, -1] if the value is not found", function () {
        const [value, index] = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"]).lastWithIndex((e) => e.startsWith("K"));
        assert.isUndefined(value);
        expect(index).to.be.equal(-1);
    });
});
