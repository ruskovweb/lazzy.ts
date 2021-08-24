import { OptionalComparer } from "./helpers";
import { Node } from "./node";

export class BinaryTree<T> {
    root: Node<T>;

    constructor(root: Node<T>) {
        this.root = root;
    }

    public add(node: Node<T>, ...comparer: OptionalComparer<T>) {
        if (comparer[0] != null) {
            this.recursiveAdd(node, this.root, comparer[0]);
        } else if (typeof node.value === "number") {
            const numericComparer = (left: T, right: T) => (left as unknown as number) - (right as unknown as number);
            this.recursiveAdd(node, this.root, numericComparer);
        } else if (typeof node.value === "string") {
            const numericComparer = (left: T, right: T) => (left as unknown as string).localeCompare(right as unknown as string);
            this.recursiveAdd(node, this.root, numericComparer);
        } else {
            throw new TypeError("You must pass a comparer function!");
        }
    }

    private recursiveAdd(node: Node<T>, parent: Node<T>, comparer: (left: T, right: T) => number) {
        if (comparer(node.value, parent.value) < 0) {
            if (parent.left != null) {
                this.recursiveAdd(node, parent.left, comparer);
            } else {
                parent.left = node;
            }
        } else {
            if (parent.right != null) {
                this.recursiveAdd(node, parent.right, comparer);
            } else {
                parent.right = node;
            }
        }
    }
}
