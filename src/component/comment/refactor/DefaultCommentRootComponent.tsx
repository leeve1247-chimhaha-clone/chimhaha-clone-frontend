import type { CommentProps } from "../CommentComponent.tsx";
import { LexicalComment } from "../../wysiwyg/lexical/LexicalComment.tsx";
import { DefaultCommentComponentList } from "./DefaultCommentComponentList.tsx";
import { useRef, useState } from "react";
import type { LexicalEditor } from "lexical";
import { SubmitCommentButton } from "./SubmitCommentButton.tsx";
import style from "../CommentComponent.module.css";
import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import axios from "axios";
import { CData } from "../../../../credential/data.ts";
import { CommentPageButtons } from "./CommentPageButtons.tsx";

export function DefaultCommentRootComponent() {
  const ref = useRef<LexicalEditor | undefined>(undefined);
  const { postId } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: [...queryKeys.CommentPageSize, postId],
    queryFn: fetchCommentPageSize,
  });

  async function fetchCommentPageSize() {
    return axios
      .get<number>(CData.local_backend + "/get/comment/page-size", {
        params: {
          postId: postId,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch(console.error);
  }

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (postId === undefined) return <div>Fuck!</div>;
  if (data === undefined) return <div>data is undefined</div>;
  return (
    <>
      <Companion />
      <div className={style.submitCommentContainer}>
        <LexicalComment ref={ref} />
        <div className={style.buttonContainer}>
          <SubmitCommentButton postId={postId} ref={ref} commentId={undefined} commentPageNum={data} />
        </div>
      </div>
    </>
  );
}

function Companion() {
  const [commentPageNum, setCommentPageNum] = useState<number>(1);
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const pageSize = queryClient.getQueryData<number>([...queryKeys.CommentPageSize, postId]);
  const { data, isLoading, error } = useQuery({
    queryKey: [...queryKeys.CommentList, postId, commentPageNum],
    queryFn: fetchCommentPage,
  });

  function handleCommentPage(pageNum: number) {
    setCommentPageNum(pageNum);
  }

  async function fetchCommentPage() {
    return axios
      .get<CommentProps[]>(CData.local_backend + "/get/comment/page", {
        params: {
          postId: postId,
          pageNum: commentPageNum,
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
  return (
    <>
      {pageSize !== 0 && <CommentPageButtons pageSize={pageSize} handleCommentPage={handleCommentPage} />}
      {data?.length !== undefined && data?.length > 0 && <DefaultCommentComponentList postId={postId} comments={data} />}
      {pageSize !== 0 && <CommentPageButtons pageSize={pageSize} handleCommentPage={handleCommentPage} />}
    </>
  );
}
