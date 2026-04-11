import cssClass from "../CommentComponent.module.css";
import { useAuth } from "react-oidc-context";
import { useDispatch, useSelector } from "react-redux";
import { setCommentLike } from "../../../redux/comment/commentRootComponentSlice.tsx";
import type { RootState } from "../../../redux/store.tsx";
import { commentApi } from "../../../api/commentApi.ts";

function LikeThisCommentButton({ commentId }: { commentId: string; postId: string }) {
  const auth = useAuth();
  const dispatch = useDispatch();
  const selfLiked = useSelector((state: RootState) => state.commentRootComponentStatus.commentLikes[commentId]?.selfLiked);
  async function likeThisComment() {
    const access_token = auth?.user?.access_token;
    if (!access_token) return;
    const likes = await commentApi.likeComment(commentId, access_token);
    dispatch(setCommentLike({ commentId: String(commentId), likes, selfLiked: !selfLiked }));
  }
  return (
    <button className={cssClass.button} onClick={likeThisComment}>
      {selfLiked ? "좋아요 취소" : "좋아요"}
    </button>
  );
}

export function CommentTail({ commentId, openReplyEditor, postId }: { postId: string; commentId: string; openReplyEditor?: () => void }) {
  return (
    <div className={cssClass.DefaultCommentTail}>
      <div className={cssClass.button} onClick={openReplyEditor}>
        답글
      </div>
      <LikeThisCommentButton postId={postId} commentId={commentId} />
    </div>
  );
}
