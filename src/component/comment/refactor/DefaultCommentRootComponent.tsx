import type { CommentProps } from "../CommentComponent.tsx";
import { LexicalComment } from "../../wysiwyg/lexical/LexicalComment.tsx";
import { DefaultCommentComponentList } from "./DefaultCommentComponentList.tsx";
import { useRef } from "react";
import type { LexicalEditor } from "lexical";
import { SubmitCommentButton } from "./SubmitCommentButton.tsx";
import style from "../CommentComponent.module.css";

export function DefaultCommentRootComponent({ postId, comments }: { postId: string; comments: CommentProps[] | undefined }) {
  const ref = useRef<LexicalEditor | undefined>(undefined);
  return (
    <>
      {comments?.length !== undefined && comments?.length > 0 && <DefaultCommentComponentList postId={postId} comments={comments} />}
      <div className={style.submitCommentContainer}>
        <LexicalComment ref={ref} />
        <div className={style.buttonContainer}>
          <SubmitCommentButton postId={postId} ref={ref} commentId={undefined} />
        </div>
      </div>
    </>
  );
}
