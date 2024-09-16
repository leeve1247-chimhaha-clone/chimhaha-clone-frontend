import { forwardRef, useEffect } from "react";
import "../WYSIWYGEditor.css";
import Quill from "quill";
import Delta from "quill-delta";

export const CommentEditor = forwardRef<Quill, {defaultValue? : Delta}>(
  ({}, quillRef) => {
    useEffect(() => {
      if (quillRef === null || typeof quillRef === "function") return;
      const container = document.getElementById("comment-editor") as HTMLElement;
      if (container && !quillRef.current) {
          quillRef.current = new Quill(container, {
            modules: {
              toolbar: false,
            },
            theme: "snow",
            formats: []
          });
      }
    }, [quillRef]);

    return <>
      <div id={`comment-editor`} style={{ height: "100px" }} />
    </>
  },
);
