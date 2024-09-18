import { forwardRef, useEffect } from "react";
import "../WYSIWYGEditor.css";
import Quill from "quill";

interface CommentEditorProps {
  commentId?: string;
}

export const CommentEditor = forwardRef<Quill, CommentEditorProps>(({ commentId }, quillRef) => {
  const divId = commentId ? `comment-editor-${commentId}` : "comment-editor";
  useEffect(() => {
    if (quillRef === null || typeof quillRef === "function") return;
    const container = document.getElementById(divId) as HTMLElement;
    if (container && !quillRef.current) {
      quillRef.current = new Quill(container, {
        modules: {
          toolbar: false,
        },
        placeholder: "댓글을 입력하세요",
        theme: "snow",
        formats: [],
      });
    }
  }, [quillRef]);
  return <div id={divId} style={{ height: "100px" }} />;
});
