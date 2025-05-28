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
import { type LexicalEditor, ParagraphNode, TextNode } from "lexical";
import { ImageNode } from "./nodes/ImageNode.tsx";
import ExampleTheme from "./ExampleTheme.tsx";
import { RefEditorPlugin } from "./plugins/RefEditorPlugin.tsx";
import type { RefObject } from "react";
import { UpdateEditorStatePlugin } from "./plugins/UpdateEditorStatePlugin.tsx";

interface LexicalProps {
  readOnly?: boolean;
  postId?: string;
  ref?: RefObject<LexicalEditor | undefined>;
}

const placeholder: string = "Enter some rich text...";

export function Lexical({ readOnly = false, postId = undefined, ref }: LexicalProps) {
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
          {postId !== undefined && <UpdateEditorStatePlugin postId={postId} />}
          {/*<UpdateEditorStatePlugin />*/}
          {ref !== undefined && <RefEditorPlugin ref={ref} />}
        </div>
      </div>
    </LexicalComposer>
  );
}
