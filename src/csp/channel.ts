import { Queue } from "../common/queue";

const closedSymbol = Symbol("Closed");

export interface Closed {
    [closedSymbol]: boolean;
}

export const CLOSED: Closed = {
    [closedSymbol]: true,
};

export function isClosed<T>(value: T | Closed): value is Closed {
    return value === CLOSED;
}

export class Channel<T> {
    #puts = new Queue<() => T>();
    #takes = new Queue<((data: T | Closed) => void)>();
    
    #closed = false;
    #requestedForClose = false;
    #resolveWhenClosed?: () => void;
    #whenClosedPromise = new Promise<void>(resolve => { 
        this.#resolveWhenClosed = resolve;
    });

    constructor (...source: T[]) {
        for (const value of source) {
            new Promise<void>((resolvePut) => {
                this.#puts.enqueue(() => {
                    resolvePut();
                    return value;
                });
            })
        }
    }

    private closeChannel(): void {
        this.#closed = true;

        if (this.#takes.isNotEmpty()) {
            this.#takes.dequeue()!(CLOSED);
        }

        if (this.#resolveWhenClosed != null) {
            this.#resolveWhenClosed();
        }
    }

    public close(): void {
        this.#requestedForClose = true;

        if (this.#puts.isEmpty()) {
            this.closeChannel();
        }
    };

    public forceClose(): void {
        this.#requestedForClose = true;
        this.closeChannel();
    }

    public whenClosed(): Promise<void> {
        return this.#whenClosedPromise;
    }

    public isClosed() {
        return this.#closed;
    }

    public isRequestedForClose() {
        return this.#requestedForClose;
    }

    public reopen() {
        this.#closed = false;
        this.#requestedForClose = false;
        this.#whenClosedPromise = new Promise<void>(resolve => { 
            this.#resolveWhenClosed = resolve;
        });
    }

    async put(value: T): Promise<void> {
        if (this.#requestedForClose) return;
        
        return new Promise(resolvePut => {
            if (this.#takes.isNotEmpty()) {
                this.#takes.dequeue()!(value);
                resolvePut();
            } else {
                this.#puts.enqueue(() => {
                    resolvePut();
                    return value;
                });
            }
        });
    }

    async take(): Promise<T | Closed> {
        if (this.#closed) return CLOSED;

        return new Promise(resolveTake => {
            if (this.#puts.isNotEmpty()) {
                resolveTake(this.#puts.dequeue()!());

                if (this.#requestedForClose && this.#puts.isEmpty()) {
                    this.closeChannel();
                }
            } else {
                this.#takes.enqueue(resolveTake);
            }
        });
    }
}
