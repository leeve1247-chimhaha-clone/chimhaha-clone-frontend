import Delta from "quill-delta";
import { useRef } from "react";
import Quill from "quill";
import { CommentUpdateEditor } from "./CommentUpdateEditor.tsx";
import { CommentEditorComponent } from "./CommentEditorComponent.tsx";

interface CommentComponentProps {
  postId:string;
  key: string;
  content: Delta;
  commentId: string;
  children?: CommentComponentProps[];
}
export function CommentComponent({
  postId,
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
      <CommentEditorComponent postId={postId} commentId={commentId}>답글 달기</CommentEditorComponent>
      {children !== undefined && children?.length !== 0 ? (
        children.map((child, index) => (
          <CommentComponent
            postId = {postId}
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
