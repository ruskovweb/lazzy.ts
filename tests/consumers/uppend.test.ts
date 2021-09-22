import { expect } from "chai";
import Lazy from "../../src";
import { asyncGenerator } from "../helpers";

describe("ƒ uppend()", function () {

    it("should append only those values that do not exist in the new array", function () {
        const database = [
            { name: "Ivan", age: 20 },
            { name: "Petar", age: 30 },
        ];

        const userInput = [
            { name: "Ivan", age: 40 },
            { name: "Spas", age: 20 }
        ];

        const expected = [
            { name: "Ivan", age: 40 },
            { name: "Petar", age: 30 },
            { name: "Spas", age: 20 },
        ]

        const it = Lazy.from(userInput).toIterator();
        const uppended = Lazy.from(database).uppend(it, (oldValue, newValue) => oldValue.name === newValue.name);
        expect(uppended).to.be.deep.eq(expected);
    });
});

describe("ƒ uppendAsync()", function () {

    it("should append only those values that do not exist in the new array from an async iterator", async function () {
        const database = [
            { name: "Ivan", age: 20 },
            { name: "Petar", age: 30 },
        ];

        const userInput = [
            { name: "Ivan", age: 40 },
            { name: "Spas", age: 20 }
        ];

        const expected = [
            { name: "Ivan", age: 40 },
            { name: "Petar", age: 30 },
            { name: "Spas", age: 20 },
        ]

        const it = Lazy.fromAsync(asyncGenerator(userInput)).toAsyncIterator();
        const uppended = await Lazy.fromAsync(asyncGenerator(database)).uppend(it, (oldValue, newValue) => oldValue.name === newValue.name);
        expect(uppended).to.be.deep.eq(expected);
    });

    it("should append only those values that do not exist in the new array from a sync iterator", async function () {
        const database = [
            { name: "Ivan", age: 20 },
            { name: "Petar", age: 30 },
        ];

        const userInput = [
            { name: "Ivan", age: 40 },
            { name: "Spas", age: 20 }
        ];

        const expected = [
            { name: "Ivan", age: 40 },
            { name: "Petar", age: 30 },
            { name: "Spas", age: 20 },
        ]

        const it = Lazy.from(userInput).toIterator();
        const uppended = await Lazy.fromAsync(asyncGenerator(database)).uppend(it, (oldValue, newValue) => oldValue.name === newValue.name);
        expect(uppended).to.be.deep.eq(expected);
    });
});
