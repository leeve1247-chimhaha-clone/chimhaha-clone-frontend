import { useAuth } from "react-oidc-context";
import axios from "axios";
import { CData } from "../../../../credential/data.ts";
import { useDispatch } from "react-redux";
import type { CommentRootComponentDispatch } from "../redux/root/commentRootComponentStore.tsx";
import { setCommentPage } from "../redux/root/commentRootComponentSlice.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";

interface SubmitUpdateButton {
  postId: string;
  commentId: string;
}

export function SubmitDeleteButton({ postId, commentId }: SubmitUpdateButton) {
  const dispatch = useDispatch<CommentRootComponentDispatch>();
  const auth = useAuth();
  const queryClient = useQueryClient();

  async function submitComment() {
    const commentData = {
      postId: postId,
      commentId: commentId,
    };
    const access_token = auth?.user?.access_token;
    const pageNum = await axios
      .post<number>(CData.local_backend + "/delete/comment", commentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data)
      .catch(() => undefined);
    if (pageNum === undefined) return;
    await queryClient.invalidateQueries({ queryKey: [...queryKeys.CommentPageSize, postId] })
    await queryClient.invalidateQueries({ queryKey: [...queryKeys.CommentList, postId, String(pageNum)] });
    dispatch(setCommentPage(pageNum));
  }

  return <button onClick={submitComment}>삭제</button>;
}
