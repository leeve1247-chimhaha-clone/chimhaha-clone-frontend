import type { SerializedEditorState, SerializedLexicalNode } from "lexical";

export function clearImageSrcInEditorState(json: SerializedEditorState): void {
  clearImageSrcInLexicalNodes(json.root.children);
}

function clearImageSrcInLexicalNodes(nodes: SerializedLexicalNode[]): void {
  for (const node of nodes) {
    traverseAndClear(node);
  }
}

function traverseAndClear(obj: unknown): void {
  if (Array.isArray(obj)) {
    obj.forEach(traverseAndClear);
    return;
  }

  if (typeof obj === "object" && obj !== null) {
    const o = obj as Record<string, unknown>;

    if (o.type === "image") {
      o["src"] = "";
    }

    for (const key in o) {
      if (typeof o[key] === "object" && o[key] !== null) {
        traverseAndClear(o[key]);
      }
    }
  }
}
