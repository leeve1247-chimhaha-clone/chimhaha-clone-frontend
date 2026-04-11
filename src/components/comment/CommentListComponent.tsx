import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { queryKeys } from "../../react-query/queryKeys.tsx";
import { CommentPageButtons } from "./CommentPageButtons.tsx";
import { CommentComponents } from "./CommentComponents.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store.tsx";
import style from "./CommentComponent.module.css";
import { commentApi } from "../../api/commentApi.ts";

export function CommentListComponent() {
  const commentPageNum = useSelector((state: RootState) => state.commentRootComponentStatus.commentPage);
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const pageSize = queryClient.getQueryData<number>([...queryKeys.CommentPageSize, postId]);
  const { data, error } = useQuery({
    queryKey: [...queryKeys.CommentList, postId, commentPageNum !== undefined && commentPageNum !== 0 ? String(commentPageNum) : String(1)],
    queryFn: () => commentApi.fetchCommentPage(postId, commentPageNum),
  });

  if (error) return <div>Error: {error.message}</div>;
  if (pageSize === undefined) return <></>;
  if (postId === undefined) return <div>Fuck!</div>;
  return (
    <div className={style.marginBottom}>
      {pageSize !== 0 && <CommentPageButtons pageSize={pageSize} id={"top"} />}
      {data?.length !== undefined && data?.length > 0 && <CommentComponents postId={postId} comments={data} />}
      {pageSize !== 0 && <CommentPageButtons pageSize={pageSize} id={"bottom"} />}
    </div>
  );
}
