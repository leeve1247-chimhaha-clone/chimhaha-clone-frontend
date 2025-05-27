import cssClass from "../CommentComponent.module.css";
import axios from "axios";
import { CData } from "../../../../credential/data.ts";
import { useAuth } from "react-oidc-context";
import { useSelector } from "react-redux";
import type { CommentRootComponentState } from "../redux/root/commentRootComponentStore.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import type { CommentProps } from "../CommentProps.tsx";

function LikeThisCommentButton({postId, commentId}: {commentId: string, postId: string}) {
  const selector = useSelector((state: CommentRootComponentState)=>state.commentComponentState.commentPage);
  const commentPage = selector === undefined ? String(1) : String(selector);
  const queryClient = useQueryClient();

  const auth = useAuth();
  async function likeThisComment() {
    const access_token = auth?.user?.access_token;
    const commentData = {
      commentId: commentId,
    }
    const newVar = await axios.post(CData.local_backend + "/comments/like", commentData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }).then((res)=>res.data).catch(()=>undefined);
    queryClient.setQueryData([...queryKeys.CommentList, postId, commentPage], (oldComments : CommentProps[]) => {
      if (!oldComments) return oldComments;
      return oldComments.map((comment) =>
        comment.id === commentId ? { ...comment, likes: newVar } : comment
      );
    })

  }
  return <button className={cssClass.button} onClick={likeThisComment}>좋아요</button>;
}

export function CommentTail({ commentId, openReplyEditor, postId }: {
  postId: string,
  commentId: string;
  openReplyEditor?: () => void
}) {
  return (
    <div className={cssClass.DefaultCommentTail}>
      <div className={cssClass.button} onClick={openReplyEditor}>
        답글
      </div>
      <LikeThisCommentButton postId={postId} commentId={commentId} />
    </div>
  );
}
