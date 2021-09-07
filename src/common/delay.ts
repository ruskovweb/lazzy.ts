export async function delay(millisconds: number) {
    return new Promise(resolve => {
        setTimeout(resolve, millisconds)
    });
}
