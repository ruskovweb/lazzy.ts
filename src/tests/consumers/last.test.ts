import { expect } from "chai";
import Lazy from "../..";

describe("ƒ last()", function () {
    it("should get the last even number", function () {
        const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).last((n) => n % 2 === 0);
        expect(result).to.be.eql(10);
    });

    it("should get the last even number less than or equal to 5", function () {
        const result = Lazy.from([10, 1, 8, 3, 6, 7, 5, 2, 9]).last((n) => n <= 5);
        expect(result).to.be.eql(2);
    });

    it("should get the last record with searched prop value", function () {
        const result = Lazy.from([
            { a: "a", b: "b" },
            { a: "b", b: "b" },
            { a: "a", c: "c" },
            { a: "b", c: "c" },
            { a: "c", d: "d" },
        ]).last((o) => o.a === "a");

        expect(result).to.be.deep.eq({ a: "a", c: "c" });
    });
});
