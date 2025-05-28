import {
  useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";
import type { RefObject } from "react";
import type { LexicalEditor } from "lexical";

export function RefEditorPlugin({ref}:{ref: RefObject<LexicalEditor|undefined>}) {
  const [editor] = useLexicalComposerContext();
  if (ref.current === undefined){
    ref.current = editor;
  }
  return null;
}
