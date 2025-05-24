import type { CommentProps } from "../CommentComponent.tsx";
import { DefaultCommentComponent } from "./DefaultCommentComponent.tsx";
import style from "../CommentComponent.module.css";

export function DefaultCommentComponentList({ comments, postId }: { comments: CommentProps[]; postId: string }) {
  return (
    <div className={style.DefaultCommentRootContainer}>
      {comments.map((comment) => {
        return <DefaultCommentComponent key={comment.id} postId = {postId} initComment={comment} />;
      })}
    </div>
  );
}
