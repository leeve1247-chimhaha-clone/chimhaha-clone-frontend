import { CommentComponent } from "./CommentComponent.tsx";
import style from "./CommentComponent.module.css";
import type { CommentProps } from "./CommentProps.tsx";

export function CommentComponents({ comments, postId }: { comments: CommentProps[]; postId: string }) {
  return (
    <div className={style.DefaultCommentRootContainer}>
      {comments.map((comment) => {
        return <CommentComponent key={comment.id} postId = {postId} comment={comment} />;
      })}
    </div>
  );
}
