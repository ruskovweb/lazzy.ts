import { expect } from "chai";
import Lazy from "../..";

describe("ƒ uppend()", function () {
    it("should append only those values that do not exist in the new array", function () {
        const uppended = Lazy.from([1, 2, 3, 4, 6]).uppend([1, 3, 5, 4, 8], (oldValue, newValue) => oldValue === newValue);
        expect(uppended).to.be.deep.eq([1, 3, 5, 4, 8, 2, 6]);
    });

    it("should replace matched records with the new one and should append unmatched records", function () {
        const old = [
            { a: "a", b: "c" },
            { a: "j", b: "b" },
            { a: "w", b: "c" },
            { a: "b", b: "c" },
            { a: "c", b: "q" },
            { a: "z", b: "z" },
            { a: "j", b: "r" },
        ];
        const newEntities = [
            { a: "a", b: "b" },
            { a: "b", b: "b" },
            { a: "a", b: "c" },
            { a: "b", b: "c" },
            { a: "c", b: "d" },
        ];
        const expected = [
            { a: "a", b: "c" },
            { a: "b", b: "c" },
            { a: "a", b: "c" },
            { a: "b", b: "c" },
            { a: "c", b: "q" },
            { a: "j", b: "b" },
            { a: "w", b: "c" },
            { a: "z", b: "z" },
            { a: "j", b: "r" },
        ];

        const uppended = Lazy.from(old).uppend(newEntities, (oldValue, newValue) => oldValue.a === newValue.a);
        expect(uppended).to.be.deep.eq(expected);
    });
});
