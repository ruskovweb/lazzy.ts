import { assert, expect } from "chai";
import { Channel, Closed, CLOSED, isClosed } from "../../src/csp/channel";

describe("ƒ channel()", function () {
    it("should return an array of 6 ping/pongs", async function() {
        const channel = new Channel<"ping" | "pong">();
        const result: ("ping" | "pong")[] = [];

        async function player(name: "ping" | "pong") {
            while (!channel.isClosed()) {
                const value = await channel.take();
                if (isClosed(value)) {
                    break;
                }

                result.push(value);
                if (result.length === 6) {
                    channel.close();
                }
                
                await channel.put(name);
            }
        }
        
        player("pong");
        player("ping");
        
        await channel.put("ping");
        await channel.whenClosed();

        expect(result).to.be.deep.eq(["ping", "pong", "ping", "pong", "ping", "pong"]);
    });

    it("should close the channel immediately if the channel is empty", async function () {
        const channel = new Channel<number>();
        channel.close();

        assert.isTrue(channel.isClosed());
        expect(await channel.take()).to.be.equal(CLOSED);
    });

    it("should close the channel after taking all values and should prevent putting new values", async function () {
        const channel = new Channel<number>(1, 2, 3);
        
        channel.close();
        
        // We can't put new values when the channel is closed.
        await channel.put(4);
        await channel.put(5);
        
        // The status will become to 'closed' when we take all values.
        assert.isFalse(channel.isClosed());

        // But we can check if it is requested for close.
        assert.isTrue(channel.isRequestedForClose());
        
        expect(await channel.take()).to.be.equal(1);
        expect(await channel.take()).to.be.equal(2);
        expect(await channel.take()).to.be.equal(3);

        // Now it is closed
        assert.isTrue(channel.isClosed());
        expect(await channel.take()).to.be.equal(CLOSED);
    });

    it("should force close the channel and prevent putting and taking values", async function () {
        const channel = new Channel<number>(1, 2, 3);
        
        expect(await channel.take()).to.be.equal(1);

        channel.forceClose();
        
        // We can't put new values when the channel is closed.
        await channel.put(4);
        await channel.put(5);

        // The status becomes to 'closed' immediately.
        assert.isTrue(channel.isClosed());
        assert.isTrue(channel.isRequestedForClose());

        // We can't take the existing values and we will receive the 'closed' value.
        expect(await channel.take()).to.be.equal(CLOSED);
    });

    it("should force close the channel and prevent putting and taking values, then should reopen it and take the rest", async function () {
        const channel = new Channel<number>(1, 2, 3);
        
        expect(await channel.take()).to.be.equal(1);

        channel.forceClose();
        
        // We can't put new values when the channel is closed.
        await channel.put(4);
        await channel.put(5);

        // The status becomes to 'closed' immediately.
        assert.isTrue(channel.isClosed());
        assert.isTrue(channel.isRequestedForClose());

        // We can't take the existing values and we will receive the 'closed' value.
        expect(await channel.take()).to.be.equal(CLOSED);

        channel.reopen();
        
        // We can put new values.
        channel.put(4);
        channel.put(5);

        channel.close();

        // The status will become to 'closed' when we take all the values.
        assert.isFalse(channel.isClosed());

        // But we can check if it is requested for close.
        assert.isTrue(channel.isRequestedForClose());

        // We can get the rest old values and the new ones.
        expect(await channel.take()).to.be.equal(2);
        expect(await channel.take()).to.be.equal(3);
        expect(await channel.take()).to.be.equal(4);
        expect(await channel.take()).to.be.equal(5);

        // Now it is closed again.
        assert.isTrue(channel.isClosed());
        expect(await channel.take()).to.be.equal(CLOSED);
    });

    it("should put three values initially and then take them", async function () {
        const channel = new Channel(1, 2, 3);
        const result: (number | Closed)[] = [];

        for (let i = 0; i < 3; i++) {
            result.push(await channel.take());        
        }

        channel.close();
        
        assert.isTrue(channel.isClosed());
        expect(result).to.be.deep.eq([1, 2, 3]);
        expect(await channel.take()).to.be.equal(CLOSED);
    });
});
