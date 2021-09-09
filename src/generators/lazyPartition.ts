import { chainAsync } from "../chain";
import { ILazyCollectionAsync } from "../contracts";
import { Channel, isClosed } from "../csp/channel";

export function* lazyPartition<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T, index: number) => boolean): Generator<ILazyCollectionAsync<T, void, undefined>, R, undefined> {
    const positive = new Channel<T>();
    const negative = new Channel<T>();
    
    yield chainAsync(async function * (): AsyncGenerator<T, void, undefined> {
        while (!positive.isClosed()) {
            const value = await positive.take();
            if (isClosed(value)) {
                break;
            }
            yield value;
        }
    }());
    
    yield chainAsync(async function * (): AsyncGenerator<T, void, undefined> {
        while (!negative.isClosed()) {
            const value = await negative.take();
            if (isClosed(value)) {
                break;
            }
            yield value;
        }
    }());
    
    let index = 0;    
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value, index++)) {
            positive.put(x.value);
        } else {
            negative.put(x.value);
        }
        x = iterator.next();
    }

    positive.close();
    negative.close();

    return x.value;
}

export async function* lazyPartitionAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, predicate: (value: T, index: number) => boolean | Promise<boolean>): AsyncGenerator<ILazyCollectionAsync<T, void, undefined>, R, undefined> {
    const positive = new Channel<T>();
    const negative = new Channel<T>();

    yield chainAsync(async function* (): AsyncGenerator<T, void, undefined> {
        while (!positive.isClosed()) {
            const value = await positive.take();
            if (isClosed(value)) {
                break;
            }
            yield value;
        }
    }());

    yield chainAsync(async function* (): AsyncGenerator<T, void, undefined> {
        while (!negative.isClosed()) {
            const value = await negative.take();
            if (isClosed(value)) {
                break;
            }
            yield value;
        }
    }());

    let index = 0;    
    let x = await iterator.next();
    while (x.done !== true) {
        if (await predicate(x.value, index++)) {
            positive.put(x.value);
        } else {
            negative.put(x.value);
        }
        x = await iterator.next();
    }

    positive.close();
    negative.close();

    return x.value;
}
