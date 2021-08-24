import { expect } from "chai";
import Lazy from "../..";

describe("ƒ orderBy()", function () {
    it("should order all numbers in ascending order", function () {
        const ordered = Lazy.from([6, 8, 3, 5, 9, 1, 7, 2, 4]).orderBy().toArray();

        expect(ordered).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("should order all numbers in descending order", function () {
        const ordered = Lazy.from([6, 8, 3, 5, 9, 1, 7, 2, 4])
            .orderBy((a, b) => b - a)
            .toArray();

        expect(ordered).to.be.deep.eq([9, 8, 7, 6, 5, 4, 3, 2, 1]);
    });

    it("should order all names in ascending order", function () {
        const ordered = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"]).orderBy().toArray();

        expect(ordered).to.be.deep.eq(["Bob", "Jonathan", "Josh", "Michael"]);
    });

    it("should order all names in descending order", function () {
        const ordered = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"])
            .orderBy((a, b) => b.localeCompare(a))
            .toArray();

        expect(ordered).to.be.deep.eq(["Michael", "Josh", "Jonathan", "Bob"]);
    });
});
