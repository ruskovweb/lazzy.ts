import { OptionalComparer } from "../common";
import { BinaryTree } from "../common/binaryTree";
import { dfs } from "../common/dfs";
import { Node } from "../common/node";

export function* sort<T, R, N>(iterator: Iterator<T, R, N>, ...comparer: OptionalComparer<T>): Generator<T, R, undefined> {
    let x = iterator.next();
    if (x.done) {
        return x.value;
    }

    const tree = new BinaryTree<T>(new Node(x.value));

    x = iterator.next();
    while (x.done !== true) {
        tree.add(new Node(x.value), ...comparer);
        x = iterator.next();
    }

    yield* dfs(tree.root);

    return x.value;
}
