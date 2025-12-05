import { CommentComponents } from "./CommentComponents.tsx";
import { LexicalComment } from "../wysiwyg/lexical/comment/LexicalComment.tsx";
import cssClass from "./CommentComponent.module.css";
import { useRef, useState } from "react";
import { CommentTail } from "./tail/CommentTail.tsx";
import { CommentHeader } from "./header/CommentHeader.tsx";
import type { CommentProps } from "./CommentProps.tsx";
import { ReplyEditorComponent } from "./ReplyEditorComponent.tsx";
import { useSelector } from "react-redux";
import type { LexicalEditor } from "lexical";
import { SubmitUpdateButton } from "./buttons/SubmitUpdateButton.tsx";
import { CancelUpdateButton } from "./buttons/CancelUpdateButton.tsx";
import type { RootState } from "../../redux/store.tsx";

export function CommentComponent({ comment, postId }: { comment: CommentProps; postId: string }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [replyEditorOpen, setReplyEditorOpen] = useState(false);
  const ref = useRef<LexicalEditor | undefined>(undefined);
  const editableCommentId = useSelector((state: RootState) => state.commentRootComponentStatus.editableCommentId);
  const editable = editableCommentId === comment.id;
  const readOnly = !editable;

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

      {comment.children && comment.children.length > 0 && <CommentComponents postId={postId} comments={comment.children} />}
      {replyEditorOpen && <ReplyEditorComponent postId={postId} commentId={Number(comment.id)} closeReplyEditor={closeReplyEditor} />}
    </div>
  );
}
