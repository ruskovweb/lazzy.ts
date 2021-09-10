import { expect } from "chai";
import Lazy from "../..";

describe("ƒ lazyPartition()", function() {
    it("should split the array into two parts", async function () {
        const partitions = await Lazy.from([1, 2, 3, 4])
            .lazyPartition((n) => n % 2 === 0)
            .map(partition => partition.toArray())
            .promiseAll();
        
        expect(partitions).to.be.deep.eq([
            [2, 4],
            [1, 3],
        ]);
    });

    it("should return the sums of all even and odd numbers", async function () {
        const partitions = await Lazy.from([1, 2, 3, 4])
            .lazyPartition((n) => n % 2 === 0)
            .map(partition => partition.sum())
            .promiseAll();
        
        expect(partitions).to.be.deep.eq([6, 4]);
    });

    it("should return the sums of all even and odd numbers from an async iterator", async function () {
        const asyncIt = async function *() {
            yield * [1, 2, 3, 4];
        }

        const partitions = await Lazy.fromAsync(asyncIt())
            .lazyPartition((n) => n % 2 === 0)
            .map(partition => partition.sum())
            .promiseAll();
        
        expect(partitions).to.be.deep.eq([6, 4]);
    });
});
