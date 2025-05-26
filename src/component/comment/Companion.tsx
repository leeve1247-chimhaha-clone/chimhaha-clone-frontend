import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { queryKeys } from "../../react-query/queryKeys.tsx";
import axios from "axios";
import { CData } from "../../../credential/data.ts";
import { CommentPageButtons } from "./buttons/CommentPageButtons.tsx";
import { CommentComponentList } from "./CommentComponentList.tsx";
import type { CommentProps } from "./CommentProps.tsx";

export function Companion() {
  const [commentPageNum, setCommentPageNum] = useState<number>(1);
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const pageSize = queryClient.getQueryData<number>([...queryKeys.CommentPageSize, postId]);
  const { data, isLoading, error } = useQuery({
    queryKey: [...queryKeys.CommentList, postId, commentPageNum],
    queryFn: fetchCommentPage
  });

  function handleCommentPage(pageNum: number) {
    setCommentPageNum(pageNum);
  }

  async function fetchCommentPage() {
    return axios
      .get<CommentProps[]>(CData.local_backend + "/get/comment/page", {
        params: {
          postId: postId,
          pageNum: commentPageNum
        }
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
  return (
    <>
      {pageSize !== 0 && <CommentPageButtons pageSize={pageSize} handleCommentPage={handleCommentPage} />}
      {data?.length !== undefined && data?.length > 0 &&
        <CommentComponentList postId={postId} comments={data} />}
      {pageSize !== 0 && <CommentPageButtons pageSize={pageSize} handleCommentPage={handleCommentPage} />}
    </>
  );
}
