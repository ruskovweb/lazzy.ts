import { expect } from "chai";
import { Queue } from "../../src/common/queue";

describe("ƒ queue()", function () {
    it("should enqueue and dequeue 4 elements", function() {
        const queue = new Queue();

        expect(queue.dequeue()).to.be.equal(undefined);
        expect(queue.count()).to.be.equal(0);

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        queue.enqueue(4);

        expect(queue.count()).to.be.equal(4);
        expect(queue.dequeue()).to.be.equal(1);
        expect(queue.dequeue()).to.be.equal(2);
        expect(queue.dequeue()).to.be.equal(3);
        expect(queue.dequeue()).to.be.equal(4);
        expect(queue.count()).to.be.equal(0);
        expect(queue.dequeue()).to.be.equal(undefined);
        expect(queue.dequeue()).to.be.equal(undefined);
    });

    it("should iterate through the queue with 'for' loop", function() {
        const queue = new Queue<number>();

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        queue.enqueue(4);

        const result = [];
        for (const value of queue) {
            result.push(value);
        }

        expect(result).to.be.deep.eq([1, 2, 3, 4]);
    });
});
