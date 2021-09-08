import { Channel, isClosed } from "../csp/channel";

export function* lazyGroupBy<T, R, N, TKey, TElement, TResult>(
    iterator: Iterator<T, R, N>,
    keySelector: (v: T) => TKey,
    elementSelector: (v: T) => TElement,
    resultSelector: (key: TKey, elements: AsyncGenerator<TElement, void, undefined>) => TResult
): Generator<TResult, R, undefined> {
    const groups = new Map<TKey, Channel<TElement>>();

    let x = iterator.next();
    while (x.done !== true) {
        const key = keySelector(x.value);
        const element = elementSelector(x.value);

        if (!groups.has(key)) {
            const channel = new Channel<TElement>();
            yield resultSelector(key, (async function *(): AsyncGenerator<TElement, void, undefined> {
                while (!channel.isClosed()) {
                    const value = await channel.take();
                    if (isClosed(value)) {
                        break;
                    }
                    yield value;
                }
            }()));
            groups.set(key, channel);
        }

        const channel = groups.get(key)!;
        channel.put(element);
        x = iterator.next();
    }

    for (const [, channel] of groups) {
        channel.close();
    }

    return x.value;
}
