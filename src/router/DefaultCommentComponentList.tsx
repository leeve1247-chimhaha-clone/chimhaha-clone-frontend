import type { CommentProps } from "../component/comment/CommentComponent.tsx";
import { DefaultCommentComponent } from "./DefaultCommentComponent.tsx";

export function DefaultCommentComponentList({ comments, postId }: { comments: CommentProps[]; postId: number }) {
  return (
    <>
      {comments.map((comment) => {
        return <DefaultCommentComponent key={comment.id} postId = {postId} initComment={comment} />;
      })}
    </>
  );
}
