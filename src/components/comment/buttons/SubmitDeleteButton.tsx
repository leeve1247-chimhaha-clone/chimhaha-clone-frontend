import { useAuth } from "react-oidc-context";
import { useDispatch } from "react-redux";
import { setCommentPage } from "../../../redux/comment/commentRootComponentSlice.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import { commentApi } from "../../../api/commentApi.ts";

interface SubmitUpdateButton {
  postId: string;
  commentId: string;
}

export function SubmitDeleteButton({ postId, commentId }: SubmitUpdateButton) {
  const dispatch = useDispatch();
  const auth = useAuth();
  const queryClient = useQueryClient();

  async function deleteComment() {
    const access_token = auth?.user?.access_token;
    if (!access_token) return;
    const pageNum = await commentApi.deleteComment({ postId, commentId }, access_token);
    if (pageNum === undefined) return;
    await queryClient.invalidateQueries({ queryKey: [...queryKeys.CommentPageSize, postId] });
    await queryClient.invalidateQueries({ queryKey: [...queryKeys.CommentList, postId, String(pageNum)] });
    dispatch(setCommentPage(pageNum));
  }

  return <button onClick={deleteComment}>삭제</button>;
}
