import type { CommentProps } from "../CommentComponent.tsx";
import { LexicalComment } from "../../wysiwyg/lexical/LexicalComment.tsx";
import { DefaultCommentComponentList } from "./DefaultCommentComponentList.tsx";
import { useRef } from "react";
import type { LexicalEditor } from "lexical";
import { SubmitCommentButton } from "./SubmitCommentButton.tsx";
import style from "../CommentComponent.module.css";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import axios from "axios";
import { CData } from "../../../../credential/data.ts";

export function DefaultCommentRootComponent() {
  const ref = useRef<LexicalEditor | undefined>(undefined);
  const { postId } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: [...queryKeys.CommentList, postId, 1],
    queryFn: fetchCommentPage,
  });

  async function fetchCommentPage() {
    return axios
      .get<CommentProps[]>(CData.local_backend + "/get/comment/page?postId=" + postId)
      .then((response) => {
        return response.data;
      })
      .catch(console.error);
  }

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (postId === undefined) return <div>Fuck!</div>;

  return (
    <>
      {data?.length !== undefined && data?.length > 0 && <DefaultCommentComponentList postId={postId} comments={data} />}
      <div className={style.submitCommentContainer}>
        <LexicalComment ref={ref} />
        <div className={style.buttonContainer}>
          <SubmitCommentButton postId={postId} ref={ref} commentId={undefined} />
        </div>
      </div>
    </>
  );
}
