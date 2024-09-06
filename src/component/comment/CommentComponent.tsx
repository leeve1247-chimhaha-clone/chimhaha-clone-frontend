import { useRef } from "react";
import Quill from "quill";
import { CommentUpdateEditor } from "./CommentUpdateEditor.tsx";
import { CommentEditorComponent } from "./CommentEditorComponent.tsx";
import cssClass from "./CommentComponent.module.css";
import Delta from "quill-delta";

interface CommentComponentProps {
  postId: string;
  key: string;
  comment: CommentProps;
}

export interface CommentProps {
  username?: string;
  content: Delta;
  id: string;
  children?: CommentProps[];
}

export function CommentComponent({ postId, comment }: CommentComponentProps) {
  const commentRef = useRef<Quill>(null);
  return (
    <div>
      <CommentUpdateEditor
        ref={commentRef}
        defaultValue={comment.content}
        commentId={comment.id}
      />
      <div className={cssClass.buttons}>
        <button>수정</button>
        <button>삭제</button>
      </div>
        <CommentEditorComponent postId={postId} commentId={comment.id}>
          답글 달기
        </CommentEditorComponent>

      <div className={cssClass.termToLeft}>
        {comment.children !== undefined && comment.children?.length !== 0 ? (
          comment.children.map((child, index) => (
            <CommentComponent
              key={index.toString()}
              postId={postId}
              comment={child}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
