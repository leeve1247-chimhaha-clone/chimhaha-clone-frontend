import { CommentComponents } from "./CommentComponents.tsx";
import { LexicalComment } from "../wysiwyg/lexical/LexicalComment.tsx";
import cssClass from "./CommentComponent.module.css";
import { useState } from "react";
import { likeComment } from "../../utils/saveComment.ts";
import { useAuth } from "react-oidc-context";
import { CommentTail } from "./tail/CommentTail.tsx";
import { CommentHeader } from "./header/CommentHeader.tsx";
import type { CommentProps } from "./CommentProps.tsx";
import { ReplyEditorComponent } from "./ReplyEditorComponent.tsx";

export function CommentComponent({ initComment, postId }: { initComment: CommentProps; postId: string }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const auth = useAuth();
  const [comment, setComment] = useState(initComment);
  const [replyEditorOpen, setReplyEditorOpen] = useState(false);
  const [readOnly, setReadOnly] = useState(true);

  function openReplyEditor() {
    setReplyEditorOpen(true);
  }

  function closeReplyEditor() {
    setReplyEditorOpen(false);
  }

  async function likeThisComment() {
    if (auth.user?.access_token === undefined) return;
    const axiosResponse = await likeComment({
      commentId: comment.id,
      access_token: auth.user?.access_token,
    });
    setComment((prevData) => ({
      ...prevData,
      likes: axiosResponse.data,
    }));
  }
  function handleReadonly() {
    setReadOnly(true);
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
        handleReadOnly={handleReadonly}
      />
      <LexicalComment readOnly={readOnly} content={comment.content} />
      {!replyEditorOpen && <CommentTail likeThisComment={likeThisComment} openReplyEditor={openReplyEditor} />}
      {replyEditorOpen && <ReplyEditorComponent postId={postId} commentId={Number(comment.id)} closeReplyEditor={closeReplyEditor} />}
      {comment.children && <CommentComponents postId={postId} comments={comment.children} />}
    </div>
  );
}
