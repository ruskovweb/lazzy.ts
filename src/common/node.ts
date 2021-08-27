export class Node<T> {
    value: T;
    left?: Node<T>
    right?: Node<T>

    constructor(value: T, left?: Node<T>, right?: Node<T>) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
