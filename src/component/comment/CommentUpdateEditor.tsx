import { forwardRef, useEffect } from "react";
import "../WYSIWYGEditor.css";
import Quill from "quill";
import Delta from "quill-delta";

interface CommentUpdateEditorProps {defaultValue? : Delta, commentId: string, editState?: boolean, removedState: boolean}


export const CommentUpdateEditor = forwardRef<Quill,CommentUpdateEditorProps >(
  ({commentId, defaultValue, editState, removedState}, quillRef) => {
    useEffect(() => {
      if (quillRef === null || typeof quillRef === "function") return;
      const container = document.getElementById("comment-" + commentId) as HTMLElement;
      // 1. read // removed
      if (container && !editState) {
        if (!editState) {
          quillRef.current = new Quill(container, {
            readOnly: true,
            modules: {
              toolbar: false,
            },
            theme: "snow",
            formats: []
          });
          if (defaultValue !== undefined) quillRef.current.setContents(defaultValue)
        }
        // 2. update
      } else if (container && quillRef.current && editState){
        quillRef.current = new Quill(container, {
          readOnly: false,
          modules:{
            toolbar: false,
          },
          theme: "snow",
          formats: []
        });
      }
    }, [quillRef,editState, removedState]);

    return <>
      <div id={`comment-${commentId}`}/>
    </>
  },
);
