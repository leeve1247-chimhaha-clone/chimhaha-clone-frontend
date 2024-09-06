import { useRef } from "react";
import Quill from "quill";
import { CommentUpdateEditor } from "./CommentUpdateEditor.tsx";
import { CommentEditorComponent } from "./CommentEditorComponent.tsx";
import { CommentProps } from "../PostDetail.tsx";

interface CommentComponentProps {
  postId: string;
  key: string;
  comment: CommentProps;
}

export function CommentComponent({
  postId,
  comment,
}: CommentComponentProps) {
  const commentRef = useRef<Quill>(null);
  return (
    <div>
      <CommentUpdateEditor
        ref={commentRef}
        defaultValue={comment.content}
        commentId={comment.id}
      />
      <button>수정</button>
      <button>삭제</button>
      <CommentEditorComponent postId={postId} commentId={comment.id}>
        답글 달기
      </CommentEditorComponent>
      {comment.children !== undefined && comment.children?.length !== 0 ? (
        comment.children.map((child, index) => (
          <CommentComponent key = {index.toString()} postId={postId} comment={child} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
