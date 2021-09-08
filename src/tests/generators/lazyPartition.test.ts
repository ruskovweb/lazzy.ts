import { expect } from "chai";
import Lazy from "../..";

describe("ƒ lazyPartition()", function() {
    it("should split the array into two parts", async function () {
        const partition = Lazy.from([1, 2, 3, 4])
            .lazyPartition((n) => n % 2 === 0)
            .map(async g => {
                let res: number[] = [];
                for await (const v of g) {
                    res.push(v);
                }
                return res;
            })
            .toArray();

        const result = await Promise.all(partition);
        expect(result).to.be.deep.eq([
            [2, 4],
            [1, 3],
        ]);
    });

    it("should return the sums of all even and odd numbers", async function () {
        const partition = Lazy.from([1, 2, 3, 4])
            .lazyPartition((n) => n % 2 === 0)
            .map(async g => {
                let sum = 0;
                for await (const v of g) {
                    sum += v;
                }
                return sum;
            });
        
        const result = await Promise.all(partition);
        expect(result).to.be.deep.eq([6, 4]);
    });

    it("should return two empty arrays if the iterator is empty", async function () {
        const partition = Lazy.from([])
            .lazyPartition((n) => n % 2 === 0)
            .map(async g => {
                let res: number[] = [];
                for await (const v of g) {
                    res.push(v);
                }
                return res;
            });

        const result = await Promise.all(partition);
        expect(result).to.be.deep.eq([[], []]);
    });
});
