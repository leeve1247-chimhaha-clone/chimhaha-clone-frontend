import cssClass from "../CommentComponent.module.css";
import axios from "axios";
import { CData } from "../../../../credential/data.ts";
import { useAuth } from "react-oidc-context";
import { useDispatch } from "react-redux";
import type { CommentRootComponentDispatch } from "../redux/root/commentRootComponentStore.tsx";
import { setCommentLike } from "../redux/root/commentRootComponentSlice.tsx";
function LikeThisCommentButton({ commentId }: { commentId: string; postId: string }) {
  const auth = useAuth();
  const dispatch = useDispatch<CommentRootComponentDispatch>();
  async function likeThisComment() {
    const access_token = auth?.user?.access_token;
    const commentData = {
      commentId: commentId,
    };
    const likes = await axios
      .post(CData.local_backend + "/comments/like", commentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data)
      .catch(() => undefined);
    dispatch(setCommentLike({commentId:String(commentId), likes:likes}))
  }
  return (
    <button className={cssClass.button} onClick={likeThisComment}>
      좋아요
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
