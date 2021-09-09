import { PromiseValue } from "../common";

export function promiseRace<T, R, N>(iterator: Iterator<T | Promise<T>, R, N>): Promise<PromiseValue<T>> {
    const promise = new Promise<PromiseValue<T>>(async (resolve, reject) => {    
        let x = await iterator.next();
        while (x.done !== true) {
            Promise.resolve(x.value as PromiseValue<T>)
                .then(value=> resolve(value))
                .catch(err => reject(err));
            
            x = await iterator.next();
        }
    });

    return promise;
}
