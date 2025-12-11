import type { DOMConversionOutput, LexicalNode } from "lexical";
import { ImageNode } from "./ImageNode.tsx";
import { CData } from "../../../../../../credential/data.ts";
import { ImageStatus } from "./ImageStatus.tsx";

export function convertImageElement(domNode: Node): null | DOMConversionOutput {
  const img = domNode as HTMLImageElement;
  if (img.src.startsWith("file:///")) {
    return null;
  }
  const { alt: altText, src, width, height } = img;
  const node = new ImageNode({ src, altText, maxWidth: 500, width, height});
  return { node };
}

export function isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}

export function getStatusBy(src: string) {
  if (src.startsWith(CData.local_image_uri)) return ImageStatus.Uploaded;
  return ImageStatus.Local;
}