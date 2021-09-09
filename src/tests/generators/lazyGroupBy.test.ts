import { expect } from "chai";
import Lazy from "../..";

describe("ƒ lazyGroupBy()", function () {
    it("should group users by name and get the average ages", async function () {
        const usersData = [
            { name: "Ivan", age: 30 },
            { name: "Ivan", age: 15 },
            { name: "Georgi", age: 10 },
            { name: "Georgi", age: 19 },
            { name: "Ivan", age: 42 },
        ];

        const groups = await Lazy.from(usersData)
            .lazyGroupBy(
                (user) => user.name,
                (user) => user.age,
                async (key, ages) => ({
                    name: key,
                    average: await ages.average(),
                })
            )
            .promiseAll();

        const expected = [
            { name: "Ivan", average: 29 },
            { name: "Georgi", average: 14.5 },
        ];

        expect(groups).to.be.deep.eq(expected);
    });
});
