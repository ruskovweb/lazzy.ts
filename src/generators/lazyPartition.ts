import { Channel, isClosed } from "../csp/channel";

export function * lazyPartition<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T) => boolean): Generator<AsyncGenerator<T, void, undefined>, R, undefined> {
    let x = iterator.next();

    const positive = new Channel<T>();
    const negative = new Channel<T>();

    yield (async function * (): AsyncGenerator<T, void, undefined> {
        while (!positive.isClosed()) {
            const value = await positive.take();
            if (isClosed(value)) {
                break;
            }
            yield value;
        }
    })();

    yield (async function * (): AsyncGenerator<T, void, undefined> {
        while (!negative.isClosed()) {
            const value = await negative.take();
            if (isClosed(value)) {
                break;
            }
            yield value;
        }
    })();

    while (x.done !== true) {
        if (predicate(x.value)) {
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
