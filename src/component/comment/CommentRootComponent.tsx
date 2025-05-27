import { LexicalComment } from "../wysiwyg/lexical/LexicalComment.tsx";
import { useRef } from "react";
import type { LexicalEditor } from "lexical";
import { SubmitCommentButton } from "./buttons/SubmitCommentButton.tsx";
import style from "./CommentComponent.module.css";
import { useParams } from "react-router";
import { CommentListComponent } from "./CommentListComponent.tsx";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/queryKeys.tsx";
import axios from "axios";
import { CData } from "../../../credential/data.ts";

export function CommentRootComponent() {
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

  if (postId === undefined) return <></>
  if (isLoading) return <></>
  if (error) return <></>
  if (data === undefined) return <></>
  return (
    <>
      <CommentListComponent />
      <div className={style.submitCommentContainer}>
        <LexicalComment ref={ref} />
        <div className={style.buttonContainer}>
          <SubmitCommentButton postId={postId} ref={ref} />
        </div>
      </div>
    </>
  );
}
