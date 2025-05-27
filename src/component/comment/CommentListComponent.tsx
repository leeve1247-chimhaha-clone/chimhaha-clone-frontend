import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { queryKeys } from "../../react-query/queryKeys.tsx";
import axios from "axios";
import { CData } from "../../../credential/data.ts";
import { CommentPageButtons } from "./buttons/CommentPageButtons.tsx";
import { CommentComponents } from "./CommentComponents.tsx";
import type { CommentProps } from "./CommentProps.tsx";
import { useSelector } from "react-redux";
import type { CommentComponentState } from "./redux/DefaultSubmitBodyStore.tsx";

export function CommentListComponent() {
  const commentPageNum = useSelector((state: CommentComponentState) => state.commentComponentState.commentPage);
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const pageSize = queryClient.getQueryData<number>([...queryKeys.CommentPageSize, postId]);
  const { data, isLoading, error } = useQuery({
    queryKey: [...queryKeys.CommentList, postId, commentPageNum !== undefined && commentPageNum !== 0 ? String(commentPageNum) : String(1)],
    queryFn: fetchCommentPage,
  });

  async function fetchCommentPage() {
    return axios
      .get<CommentProps[]>(CData.local_backend + "/get/comment/page", {
        params: {
          postId: postId,
          pageNum: commentPageNum !== undefined && commentPageNum !== 0 ? String(commentPageNum) : String(1),
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch(console.error);
  }

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (pageSize === undefined) return <></>;
  if (postId === undefined) return <div>Fuck!</div>;
  console.log("======");
  console.log(commentPageNum);
  console.log(data?.length);
  console.log(pageSize);
  console.log("======");
  return (
    <>
      {pageSize !== 0 && <CommentPageButtons pageSize={pageSize} id={"top"} />}
      {data?.length !== undefined && data?.length > 0 && <CommentComponents postId={postId} comments={data} />}
      {pageSize !== 0 && <CommentPageButtons pageSize={pageSize} id={"bottom"} />}
    </>
  );
}
