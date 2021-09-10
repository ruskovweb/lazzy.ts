import { expect, assert } from "chai";
import Lazy from "../..";
import { asyncIterator } from "../helpers";

describe("ƒ at()", function () {
    it("should get the number of specific index", function () {
        const n = Lazy.from([1, 2, 3, 4]).at(1).first();
        expect(n).to.be.equal(2);
    });

    it("shuld return 'undefined' if the index is less than 0", function () {
        const n = Lazy.from([1, 2, 3, 4]).at(-1).first();
        assert.isUndefined(n);
    });

    it("shuld return 'undefined' if the index is greater than the length of the sequence", function () {
        const n = Lazy.from([1, 2, 3, 4]).at(4).first();
        assert.isUndefined(n);
    });

    it("should return the second element and modify it", function () {
        const value = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"])
            .at(1)
            .map(name => `Hello, ${name}!`)
            .first();
        expect(value).to.be.equal("Hello, Michael!");
    })
});

describe("ƒ atAsync()", function () {
    it("should get the number of specific index", async function () {
        const n = await Lazy.fromAsync(asyncIterator()).at(1).first();
        expect(n).to.be.equal(2);
    });

    it("shuld return 'undefined' if the index is less than 0", async function () {
        const n = await Lazy.fromAsync(asyncIterator()).at(-1).first();
        assert.isUndefined(n);
    });

    it("shuld return 'undefined' if the index is greater than the length of the sequence", async function () {
        const n = await Lazy.fromAsync(asyncIterator()).take(4).at(4).first();
        assert.isUndefined(n);
    });

    it("should return the second element and modify it", async function () {
        async function * names() {
            yield * ["Josh", "Michael", "Jonathan", "Bob"];
        }

        const value = await Lazy.fromAsync(names())
            .at(1)
            .map(name => `Hello, ${name}!`)
            .first();

        expect(value).to.be.equal("Hello, Michael!");
    })
});
