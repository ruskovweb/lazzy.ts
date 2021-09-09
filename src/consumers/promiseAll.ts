import { PromiseValue } from "../common";

export function promiseAll<T, R, N>(iterator: Iterator<T | Promise<T>, R, N> | AsyncIterator<T | Promise<T>, R, N>): Promise<PromiseValue<T>[]> {
    return new Promise<PromiseValue<T>[]>(async (resolve, reject) => {
        const result: PromiseValue<T>[] = [];
        let counter = 0;
        let index = 0;

        let x = await iterator.next();
        while (x.done !== true) {
            result.push(undefined as PromiseValue<T>);

            const currentIndex = index++;
            const promise = x.value as PromiseValue<T>;
            x = await iterator.next();

            Promise.resolve(promise)
                .then((value) => {
                    counter++;
                    result[currentIndex] = value;

                    if (counter === result.length) {
                        resolve(result);
                    }
                })
                .catch((err) => reject(err));
        }
    });
}
