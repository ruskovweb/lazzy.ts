import { Node } from "./node"

export class Queue<T> {
    #head: Node<T> | undefined;
    #tail: Node<T> | undefined;
    #count = 0;
    
    [Symbol.iterator] = (): Iterator<T, void, undefined> => {
        let current = this.#tail;

        return {
            next: function() {
                if (current == null) {
                    return { done: true, value: undefined };
                }
                const value = current.value;
                current = current.right;
                return { done: false, value };
            }
        };
    };
    
    public count() {
        return this.#count;
    }

    public isEmpty() {
        return this.#count === 0;
    }

    public isNotEmpty() {
        return this.#count > 0;
    }

    public enqueue(value: T): void {
        const newNode = new Node(value);

        if (this.#head == null || this.#tail == null) {
            this.#head = newNode;
            this.#tail = newNode;
            this.#count++;
            return;
        }

        const oldHead = this.#head;

        oldHead.right = newNode;
        newNode.left = oldHead;

        this.#head = newNode;
        
        this.#count++;
    };

    public dequeue(): T | undefined {
        const tail = this.#tail;

        if (this.#tail == this.#head) {
            this.#head = undefined;
        }
        
        this.#tail = this.#tail?.right;
        
        if (this.#count > 0) {
            this.#count--;
        }

        return tail?.value;
    }
}
