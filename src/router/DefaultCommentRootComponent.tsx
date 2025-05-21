import type { CommentProps } from "../component/comment/CommentComponent.tsx";
import { LexicalComment } from "../component/wysiwyg/lexical/LexicalComment.tsx";
import { DefaultCommentComponentList } from "./DefaultCommentComponentList.tsx";
import { useRef } from "react";
import type { LexicalEditor } from "lexical";
import { SubmitCommentButton } from "./SubmitCommentButton.tsx";

export function DefaultCommentRootComponent({ postId, comments }: { postId: number; comments: CommentProps[] | undefined }) {
  const ref = useRef<LexicalEditor | undefined>(undefined);

  return (
    <>
      <LexicalComment ref={ref} />
      <SubmitCommentButton postId={postId} ref={ref} commentId={undefined} />
      {comments && <DefaultCommentComponentList postId={postId} comments={comments} />}
    </>
  );
}
