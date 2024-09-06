import Delta from "quill-delta";
import { useRef } from "react";
import Quill from "quill";
import { CommentUpdateEditor } from "./CommentUpdateEditor.tsx";

interface CommentComponentProps {
  key: string;
  content: Delta;
  commentId: string;
  children?: CommentComponentProps[];
}

export function CommentComponent({
  key,
  content,
  commentId,
  children,
}: CommentComponentProps) {
  const commentRef = useRef<Quill>(null);
  return (
    <>
      <CommentUpdateEditor
        key={key}
        ref={commentRef}
        defaultValue={content}
        commentId={commentId}
      />
      <button>수정</button>
      <button>삭제</button>
      <button>답글</button>
      {children !== undefined && children?.length !== 0 ? (
        children.map((child, index) => (
          <CommentComponent
            key={key + index}
            commentId={child.commentId}
            content={child.content}
            children={child.children}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
}
