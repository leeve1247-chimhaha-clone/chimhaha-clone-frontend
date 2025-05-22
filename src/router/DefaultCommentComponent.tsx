import type { CommentProps } from "../component/comment/CommentComponent.tsx";
import { DefaultCommentComponentList } from "./DefaultCommentComponentList.tsx";
import { LexicalComment } from "../component/wysiwyg/lexical/LexicalComment.tsx";
import cssClass from "../component/comment/CommentComponent.module.css";
import { useRef, useState } from "react";
import { likeComment } from "../utils/saveComment.ts";
import { useAuth } from "react-oidc-context";
import { DefaultCommentTail } from "./DefaultCommentTail.tsx";
import { SubmitCommentButton } from "./SubmitCommentButton.tsx";
import { DefaultCommentHeader } from "./DefaultCommentHeader.tsx";

interface ReplyEditorComponentProps {
  postId: number;
  commentId: number | undefined;
  closeReplyEditor?: () => void;
}

function ReplyEditorComponent({ postId, commentId, closeReplyEditor }: ReplyEditorComponentProps) {
  const ref = useRef(undefined);
  return (
    <>
      <LexicalComment ref={ref} />
      <SubmitCommentButton postId={postId} ref={ref} commentId={commentId} />
      <button className={cssClass.buttonCancel} onClick={closeReplyEditor}>
        취소
      </button>
    </>
  );
}

export function DefaultCommentComponent({ initComment, postId }: { initComment: CommentProps; postId: number }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const auth = useAuth();
  const [comment, setComment] = useState(initComment);
  const [replyEditorOpen, setReplyEditorOpen] = useState(false);

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

  return (
    <div className={cssClass.DefaultCommentContainer}>
      <DefaultCommentHeader comment={comment} onClick={() => {setModalOpen(true);}} modalOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <LexicalComment readOnly={true} content={comment.content} />
      {!replyEditorOpen && <DefaultCommentTail likeThisComment={likeThisComment} openReplyEditor={openReplyEditor} />}
      {replyEditorOpen && <ReplyEditorComponent postId={postId} commentId={Number(comment.id)} closeReplyEditor={closeReplyEditor} />}
      {comment.children && <DefaultCommentComponentList postId={postId} comments={comment.children} />}
    </div>
  );
}
