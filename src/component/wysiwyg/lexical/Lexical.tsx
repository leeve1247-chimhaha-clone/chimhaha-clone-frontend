import { LexicalComposer } from "@lexical/react/LexicalComposer";
import ToolbarPlugin from "./plugins/ToolbarPlugin.tsx";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import styles from "./Lexical.module.css";
import ImagesPlugin from "./plugins/ImagePlugin.tsx";
import DragAndDropPlugin from "./plugins/DragAndDropPlugin.tsx";
import { type LexicalEditor, ParagraphNode, type SerializedEditorState, TextNode } from "lexical";
import { ImageNode } from "./nodes/ImageNode.tsx";
import ExampleTheme from "./ExampleTheme.tsx";
import { RefEditorPlugin } from "./RefEditorPlugin.tsx";
import type { RefObject } from "react";

interface LexicalProps {
  readOnly?: boolean;
  initSerializedEditorState?: SerializedEditorState;
  ref?: RefObject<LexicalEditor | undefined>;
}

const placeholder: string = "Enter some rich text...";

export function Lexical({ readOnly = false, initSerializedEditorState = undefined, ref }: LexicalProps) {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "React.js Demo",
        nodes: [ParagraphNode, TextNode, ImageNode],
        onError(error: Error) {
          throw error;
        },
        theme: ExampleTheme,
        editable: !readOnly,
        editorState: JSON.stringify(initSerializedEditorState),
      }}
    >
      <div className={styles.editorContainer}>
        {!readOnly && <ToolbarPlugin />}
        <div className={styles.editorInner}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={styles.editorInput}
                aria-placeholder={placeholder}
                placeholder={<div className={styles.editorPlaceholder}>{placeholder}</div>}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ImagesPlugin />
          <DragAndDropPlugin />
          {/*<UpdateEditorStatePlugin />*/}
          {ref !== undefined && <RefEditorPlugin ref={ref} />}
        </div>
      </div>
    </LexicalComposer>
  );
}
