import { expect } from "chai";
import Lazy from "../../src";
import { asyncGenerator, asyncIterator } from "../helpers";

describe("ƒ groupBy()", function () {
    it("should group all numbers by first digit", function () {
        const group = Lazy.range({ from: 1, to: 30 })
            .groupBy(
                (user) => (user + "")[0],
                (user) => user,
                (key, numbers) => ({ key, numbers })
            )
            .toArray();

        const expected = [
            { key: "1", numbers: [1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
            { key: "2", numbers: [2, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29] },
            { key: "3", numbers: [3, 30] },
            { key: "4", numbers: [4] },
            { key: "5", numbers: [5] },
            { key: "6", numbers: [6] },
            { key: "7", numbers: [7] },
            { key: "8", numbers: [8] },
            { key: "9", numbers: [9] },
        ];

        expect(group).to.be.deep.eq(expected);
    });

    it("should group users by name", function () {
        const usersData = [
            { name: "Ivan", age: 30 },
            { name: "Ivan", age: 15 },
            { name: "Georgi", age: 10 },
            { name: "Georgi", age: 19 },
            { name: "Ivan", age: 42 },
        ];

        const group = Lazy.from(usersData)
            .groupBy(
                (user) => user.name,
                (user) => user.age,
                (key, ages) => ({
                    name: key,
                    average: ages.reduce((prev, cur) => prev + cur, 0) / ages.length,
                })
            )
            .toArray();

        const expected = [
            { name: "Ivan", average: 29 },
            { name: "Georgi", average: 14.5 },
        ];

        expect(group).to.be.deep.eq(expected);
    });
});

describe("ƒ groupByAsync()", function () {
    it("should group users by name", async function () {
        const usersData = [
            { name: "Ivan", age: 30 },
            { name: "Ivan", age: 15 },
            { name: "Georgi", age: 10 },
            { name: "Georgi", age: 19 },
            { name: "Ivan", age: 42 },
        ];

        const group = await Lazy.fromAsync(asyncGenerator(usersData))
            .groupBy(
                (user) => user.name,
                (user) => user.age,
                (key, ages) => ({
                    name: key,
                    average: ages.reduce((prev, cur) => prev + cur, 0) / ages.length,
                })
            )
            .toArray();

        const expected = [
            { name: "Ivan", average: 29 },
            { name: "Georgi", average: 14.5 },
        ];

        expect(group).to.be.deep.eq(expected);
    });

    it("should group all numbers by first digit", async function () {
        const group = await Lazy.fromAsync(asyncIterator(30))
            .groupBy(
                (user) => (user + "")[0],
                (user) => user,
                (key, numbers) => ({ key, numbers })
            )
            .toArray();

        const expected = [
            { key: "1", numbers: [1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
            { key: "2", numbers: [2, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29] },
            { key: "3", numbers: [3, 30] },
            { key: "4", numbers: [4] },
            { key: "5", numbers: [5] },
            { key: "6", numbers: [6] },
            { key: "7", numbers: [7] },
            { key: "8", numbers: [8] },
            { key: "9", numbers: [9] },
        ];

        expect(group).to.be.deep.eq(expected);
    });
});
