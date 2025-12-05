import type {DOMConversionOutput, LexicalNode} from "lexical";
import {ImageNode} from "./ImageNode.tsx";

export function convertImageElement(domNode: Node): null | DOMConversionOutput {
    const img = domNode as HTMLImageElement;
    if (img.src.startsWith('file:///')) {
        return null;
    }
    const {alt: altText, src, width, height} = img;
    const node = new ImageNode({src, altText, maxWidth: 500, width, height});
    return {node};
}

export function isImageNode(
    node: LexicalNode | null | undefined
): node is ImageNode {
    return node instanceof ImageNode;
}