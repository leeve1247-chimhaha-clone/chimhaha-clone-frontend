import { LexicalComment } from "../wysiwyg/lexical/LexicalComment.tsx";
import { useRef } from "react";
import type { LexicalEditor } from "lexical";
import { SubmitCommentButton } from "./buttons/SubmitCommentButton.tsx";
import style from "./CommentComponent.module.css";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/queryKeys.tsx";
import axios from "axios";
import { CData } from "../../../credential/data.ts";
import { CommentListComponent } from "./CommentListComponent.tsx";

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

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (postId === undefined) return <div>Fuck!</div>;
  if (data === undefined) return <div>data is undefined</div>;
  return (
    <>
      <CommentListComponent />
      <div className={style.submitCommentContainer}>
        <LexicalComment ref={ref} />
        <div className={style.buttonContainer}>
          <SubmitCommentButton postId={postId} ref={ref}/>
        </div>
      </div>
    </>
  );
}
