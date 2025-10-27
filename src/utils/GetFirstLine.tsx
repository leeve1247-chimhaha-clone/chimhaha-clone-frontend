import type {SerializedEditorState, SerializedParagraphNode, SerializedTextNode} from "lexical";

export function getFirstLine(content: SerializedEditorState) {
  if (content.root.children[0]?.type !== "paragraph") {
    return;
  }
  const paragraphNode = content.root.children[0] as SerializedParagraphNode;
  if (paragraphNode.children[0]?.type !== "text") {
    return;
  }
  const textNode = paragraphNode.children[0] as SerializedTextNode;
  return textNode.text;
}
