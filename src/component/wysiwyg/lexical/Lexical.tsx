import { LexicalComposer } from "@lexical/react/LexicalComposer";
import ToolbarPlugin from "./plugins/ToolbarPlugin.tsx";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import styles from "./Lexical.module.css";
import LogButtonPlugin from "./plugins/LogButtonPlugin.tsx";
import ImagesPlugin from "./plugins/ImagePlugin.tsx";
import DragAndDropPlugin from "./plugins/DragAndDropPlugin.tsx";
import { type LexicalEditor, ParagraphNode, type SerializedEditorState, TextNode } from "lexical";
import { ImageNode } from "./nodes/ImageNode.tsx";
import ExampleTheme from "./ExampleTheme.tsx";
import { UpdateEditorStatePlugin2 } from "./UpdateEditorStatePlugin2.tsx";
import type { RefObject } from "react";

interface LexicalProps {
  readOnly?: boolean;
  initSerializedEditorState?: SerializedEditorState;
  ref: RefObject<LexicalEditor | undefined>;
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
        editorState: initSerializedEditorState !== undefined ? JSON.stringify(initSerializedEditorState) : undefined,
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
          <LogButtonPlugin />
          <ImagesPlugin />
          <DragAndDropPlugin />
          {/*<UpdateEditorStatePlugin />*/}
          {ref !== undefined && <UpdateEditorStatePlugin2 ref={ref} />}
        </div>
      </div>
    </LexicalComposer>
  );
}
