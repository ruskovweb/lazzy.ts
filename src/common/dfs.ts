import { Node } from "./node";

type LeftOrRight = "left" | "right";

export function* dfs<T>(node: Node<T>, descending = false): Generator<T, void, undefined> {
    const first: LeftOrRight = descending ? "right" : "left";
    const second: LeftOrRight = descending ? "left" : "right";

    if (node[first] != null) {
        yield * dfs(node[first]!);
    }

    yield node.value;

    if (node[second] != null) {
        yield * dfs(node[second]!);
    }
}
