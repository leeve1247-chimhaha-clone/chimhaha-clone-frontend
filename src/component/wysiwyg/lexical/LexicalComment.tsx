import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import styles from "./LexicalComment.module.css";
import { type LexicalEditor, ParagraphNode, type SerializedEditorState, TextNode } from "lexical";
import ExampleTheme from "./ExampleTheme.tsx";
import type { RefObject } from "react";
import { RefEditorPlugin } from "./RefEditorPlugin.tsx";

interface LexicalCommentProps {
  readOnly?: boolean;
  ref?: RefObject<LexicalEditor | undefined>;
  content?: SerializedEditorState;
}

const placeholder: string = "I am a comment...";

export function LexicalComment({ readOnly = false, content = undefined, ref }: LexicalCommentProps) {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "React.js Demo",
        nodes: [ParagraphNode, TextNode],
        onError(error: Error) {
          throw error;
        },
        theme: ExampleTheme,
        editable: !readOnly,
        editorState: JSON.stringify(content),
      }}
    >
      <div className={!readOnly ? styles.editorContainer : styles.editorContainerReadOnly}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={!readOnly ? styles.editorInput : styles.editorInputReadOnly}
              aria-placeholder={placeholder}
              placeholder={<div className={styles.editorPlaceholder}>{placeholder}</div>}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        {ref !== undefined && <RefEditorPlugin ref={ref} />}
      </div>
    </LexicalComposer>
  );
}
