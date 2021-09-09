export function delay<T>(millisconds: number, value?: T): Promise<T extends undefined ? void : T> {
    return new Promise<T extends undefined ? void : T>(resolve => {
        setTimeout(() => {
            resolve(value as T extends undefined ? void : T);
        }, millisconds)
    });
}
