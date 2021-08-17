import { expect } from "chai";
import Lazy from "../..";

describe("ƒ groupBy()", function () {
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
