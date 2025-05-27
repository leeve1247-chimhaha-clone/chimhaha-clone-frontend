import { CommentComponents } from "./CommentComponents.tsx";
import { LexicalComment } from "../wysiwyg/lexical/LexicalComment.tsx";
import cssClass from "./CommentComponent.module.css";
import { useRef, useState } from "react";
import { useAuth } from "react-oidc-context";
import { CommentTail } from "./tail/CommentTail.tsx";
import { CommentHeader } from "./header/CommentHeader.tsx";
import type { CommentProps } from "./CommentProps.tsx";
import { ReplyEditorComponent } from "./ReplyEditorComponent.tsx";
import { useSelector } from "react-redux";
import type { CommentRootComponentState } from "./redux/root/commentRootComponentStore.tsx";
import type { LexicalEditor } from "lexical";
import { SubmitUpdateButton } from "./buttons/SubmitUpdateButton.tsx";
import { CancelUpdateButton } from "./buttons/CancelUpdateButton.tsx";

export function CommentComponent({ comment, postId }: { comment: CommentProps; postId: string }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [replyEditorOpen, setReplyEditorOpen] = useState(false);
  const ref = useRef<LexicalEditor | undefined>(undefined);
  const editableCommentId = useSelector((state: CommentRootComponentState) => state.commentComponentState.editableCommentId);
  const readOnly = editableCommentId !== comment.id;

  function openReplyEditor() {
    setReplyEditorOpen(true);
  }

  function closeReplyEditor() {
    setReplyEditorOpen(false);
  }

  return (
    <div className={cssClass.DefaultCommentContainer}>
      <CommentHeader
        comment={comment}
        onClick={() => {
          setModalOpen(true);
        }}
        modalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      <LexicalComment readOnly={readOnly} content={comment.content} ref={ref} />
      {!readOnly && (
        <>
          <SubmitUpdateButton postId={postId} ref={ref} commentId={comment.id} />
          <CancelUpdateButton ref={ref} />
        </>
      )}
      {!replyEditorOpen && <CommentTail postId={postId} commentId={comment.id} openReplyEditor={openReplyEditor} />}
      {replyEditorOpen && <ReplyEditorComponent postId={postId} commentId={Number(comment.id)} closeReplyEditor={closeReplyEditor} />}
      {comment.children && <CommentComponents postId={postId} comments={comment.children} />}
    </div>
  );
}
