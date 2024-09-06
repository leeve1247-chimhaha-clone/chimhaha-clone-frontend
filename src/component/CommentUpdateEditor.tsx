import { forwardRef, useEffect } from "react";
import "./WYSIWYGEditor.css";
import Quill from "quill";
import Delta from "quill-delta";

export const CommentUpdateEditor = forwardRef<Quill, {defaultValue? : Delta, commentId: string}>(
  ({commentId, defaultValue}, quillRef) => {
    useEffect(() => {
      if (quillRef === null || typeof quillRef === "function") return;
      const container = document.getElementById("comment-" + commentId) as HTMLElement;
      if (container && !quillRef.current) {
          quillRef.current = new Quill(container, {
            readOnly: true,
            modules: {
              toolbar: false,
            },
            theme: "snow",
            formats: []
          });
          if (defaultValue) quillRef.current.setContents(defaultValue)
      }
    }, [quillRef]);

    return <>
      <div id={`comment-${commentId}`}/>
    </>
  },
);
