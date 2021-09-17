import { expect } from "chai";
import Lazy, { appendAsync } from "../..";
import { asyncGenerator } from "../helpers";

describe("ƒ distinct()", function () {
    it("should remove all duplicates from number array", function () {
        const result = Lazy.from([1, 2, 2, 1, 3, 5, 4, 5]).distinct().toArray();
        expect(result).to.be.eql([1, 2, 3, 5, 4]);
    });

    it("should remove all duplicates from string array", function () {
        const result = Lazy.from(["a", "b", "a", "c", "b", "e", "c", "g"]).distinct().toArray();
        expect(result).to.be.eql(["a", "b", "c", "e", "g"]);
    });

    it("should remove all duplicates from boolean array", function () {
        const result = Lazy.from([true, false, false, true]).distinct().toArray();
        expect(result).to.be.eql([true, false]);
    });

    it("should remove all duplicates of objects by some property", function () {
        const result = Lazy.from([{ a: "a" }, { a: "b" }, { a: "a" }, { a: "b" }, { a: "c" }])
            .distinct((o) => o.a)
            .toArray();
        expect(result).to.be.deep.eq([{ a: "a" }, { a: "b" }, { a: "c" }]);
    });
});

function asyncIteratorWithDuplicates (): AsyncIterator<Promise<number>> {
    let n = 1;
    let add = true;
    
    return {
        next: async function () {
            if (n > 5) {
                return { done: true, value: undefined };
            }

            return { done: false, value: Promise.resolve((add = !add) ? n++ : n) };
        },
    };
};

describe("ƒ distinctAsync()", function () {
    it("should remove all duplicates from number array", async function () {
       const result = await Lazy.fromAsync(asyncIteratorWithDuplicates()).distinct().toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5]);
    });

    it("should remove all duplicates from string array", async function () {
        const result = await Lazy.fromAsync(asyncGenerator(["a", "b", "a", "c", "b", "e", "c", "g"])).distinct().toArray();
        expect(result).to.be.eql(["a", "b", "c", "e", "g"]);
    });

    it("should remove all duplicates from boolean array", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([true, false, false, true])).distinct().toArray();
        expect(result).to.be.eql([true, false]);
    });

    it("should remove all duplicates of objects by some property", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([{ a: "a" }, { a: "b" }, { a: "a" }, { a: "b" }, { a: "c" }]))
            .distinct((o) => o.a)
            .toArray();
        expect(result).to.be.deep.eq([{ a: "a" }, { a: "b" }, { a: "c" }]);
    });
});
