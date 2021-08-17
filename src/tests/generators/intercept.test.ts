import { assert, expect } from "chai";
import Lazy, { Interceptors } from "../..";
import { primeGenerator } from "../helpers";

describe("ƒ intercept()", function () {
    let counter = 0;
    const context = { sum: 0 };
    const sums = [2, 5, 10, 17, 28];
    const array = Lazy.from(primeGenerator()).take(5).toArray();
    const interceptors: Interceptors<typeof context, number, undefined> = {
        before: assertBefore,
        beforeEach: assertBeforeEach,
        afterEach: assertAfterEach,
        afterUpdate: assertAfterUpdate,
        after: assertAfter,
    };

    function assertBefore(iteration: number, ctx: typeof context, value: undefined): void {
        const sum = ctx.sum;
        it(`should recieve proper arguments before all iterations`, function () {
            expect(iteration).to.be.equal(0);
            expect(sum).to.be.equal(0);
            assert.isUndefined(value);
        });
    }

    function assertBeforeEach(iteration: number, ctx: typeof context, value: number): void {
        ctx.sum += value;

        const sum = ctx.sum;
        assertEach(iteration, sum, value, `should recieve proper arguments before each yield`);
    }

    function assertAfterEach(iteration: number, ctx: typeof context, value: number): void {
        const sum = ctx.sum;
        assertEach(iteration, sum, value, `should recieve proper arguments after each yield`);
    }

    function assertAfterUpdate(iteration: number, ctx: typeof context, value: number | undefined): void {
        const sum = ctx.sum;
        it(`should recieve proper arguments after update the value`, function () {
            expect(iteration).to.be.equal(counter);
            counter++;
            if (counter === array.length) {
                expect(sum).to.be.equal(sums[array.length - 1]);
                assert.isUndefined(value);
            } else {
                expect(sum).to.be.equal(sums[counter - 1]);
                expect(value).to.be.equal(array[counter]);
            }
        });
    }

    function assertEach(iteration: number, sum: number, value: number, title: string): void {
        it(title, function () {
            expect(iteration).to.be.equal(counter);
            expect(sum).to.be.equal(sums[counter]);
            expect(value).to.be.equal(array[counter]);
        });
    }

    function assertAfter(iteration: number, ctx: typeof context, value: number | undefined): void {
        const sum = ctx.sum;
        it(`should recieve proper arguments after all iterations`, function () {
            expect(iteration).to.be.equal(array.length - 1);
            expect(sum).to.be.equal(sums[array.length - 1]);
            assert.isUndefined(value);
        });
    }

    Lazy.from(primeGenerator()).take(5).intercept(interceptors, context).run();
});
