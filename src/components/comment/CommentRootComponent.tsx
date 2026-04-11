import { LexicalComment } from "../wysiwyg/lexical/comment/LexicalComment.tsx";
import { useRef } from "react";
import type { LexicalEditor } from "lexical";
import { SubmitCommentButton } from "./buttons/SubmitCommentButton.tsx";
import style from "./CommentComponent.module.css";
import styles from "./CommentComponent.module.css";
import { useParams } from "react-router";
import { CommentListComponent } from "./CommentListComponent.tsx";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/queryKeys.tsx";
import { useAuth } from "react-oidc-context";
import { commentApi } from "../../api/commentApi.ts";

export function CommentRootComponent() {
  const ref = useRef<LexicalEditor | undefined>(undefined);
  const { postId } = useParams();
  const auth = useAuth();
  const access_token = auth?.user?.access_token;

  const { data, error, isLoading } = useQuery({
    queryKey: [...queryKeys.CommentPageSize, postId],
    queryFn: () => commentApi.fetchCommentPageSize(postId),
  });

  if (postId === undefined) return <></>;
  if (isLoading) return <></>;
  if (error) return <></>;
  if (data === undefined) return <></>;
  return (
    <div>
      <div>댓글</div>
      <CommentListComponent />
      {!access_token && (
        <div className={style.submitCommentContainer}>
          <div className={style.loginRequiredContainer}>로그인 하세요</div>
          <div className={style.buttonContainer}>
            <button
              className={styles.buttonApply}
              onClick={() => {
                auth.signinPopup().then((r) => r.access_token);
              }}
            >
              로그인
            </button>
          </div>
        </div>
      )}
      {access_token && (
        <div className={style.submitCommentContainer}>
          <LexicalComment ref={ref} />
          <div className={style.buttonContainer}>
            <SubmitCommentButton postId={postId} ref={ref} />
          </div>
        </div>
      )}
    </div>
  );
}
