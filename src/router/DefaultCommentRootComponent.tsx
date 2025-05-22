import type { CommentProps } from "../component/comment/CommentComponent.tsx";
import { LexicalComment } from "../component/wysiwyg/lexical/LexicalComment.tsx";
import { DefaultCommentComponentList } from "./DefaultCommentComponentList.tsx";
import { useRef } from "react";
import type { LexicalEditor } from "lexical";
import { SubmitCommentButton } from "./SubmitCommentButton.tsx";
import style from "../component/comment/CommentComponent.module.css";

export function DefaultCommentRootComponent({ postId, comments }: { postId: number; comments: CommentProps[] | undefined }) {
  const ref = useRef<LexicalEditor | undefined>(undefined);

  return (
    <>
      <div className={style.DefaultCommentRootContainer}>{comments && <DefaultCommentComponentList postId={postId} comments={comments} />}</div>
      <div className={style.commentRootContainer}>
        <LexicalComment ref={ref} />
        <div className={style.buttonContainer}>
          <SubmitCommentButton postId={postId} ref={ref} commentId={undefined} />
        </div>
      </div>
    </>
  );
}
