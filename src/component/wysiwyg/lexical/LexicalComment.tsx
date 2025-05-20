import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import styles from "./Lexical.module.css";
import LogButtonPlugin from "./plugins/LogButtonPlugin.tsx";
import ImagesPlugin from "./plugins/ImagePlugin.tsx";
import { ParagraphNode, TextNode } from "lexical";
import { ImageNode } from "./nodes/ImageNode.tsx";
import ExampleTheme from "./ExampleTheme.tsx";

interface LexicalProps {
  readOnly?: boolean;
}

const placeholder: string = "Enter some rich text...";

export function LexicalComment({ readOnly = false }: LexicalProps) {
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
      }}
    >
      <div className={styles.editorContainer}>
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
        </div>
      </div>
    </LexicalComposer>
  );
}
