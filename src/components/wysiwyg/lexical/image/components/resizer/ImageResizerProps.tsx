import type {LexicalEditor} from "lexical";

export interface ImageResizerProps {
  imageRef: { current: null | HTMLElement };
  maxWidth?: number;
  onResizeStart: () => void;
  onResizeEnd: (width: 'inherit' | number, height: 'inherit' | number) => void;
  editor: LexicalEditor;
}