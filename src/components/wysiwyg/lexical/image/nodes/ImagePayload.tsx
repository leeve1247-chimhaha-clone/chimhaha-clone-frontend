import type {NodeKey} from "lexical";

export interface ImagePayload {
  key?: NodeKey;

  src: string,
  altText: string,
  width?: "inherit" | number,
  height?: "inherit" | number,
  maxWidth: number,
}