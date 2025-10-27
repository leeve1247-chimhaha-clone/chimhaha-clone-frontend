import {useRef} from "react";
import {LexicalComment} from "../wysiwyg/lexical/LexicalComment.tsx";
import {SubmitCommentButton} from "./buttons/SubmitCommentButton.tsx";
import cssClass from "./CommentComponent.module.css";

interface ReplyEditorComponentProps {
  postId: string;
  commentId: number | undefined;
  closeReplyEditor?: () => void;
}

export function ReplyEditorComponent({ postId, commentId, closeReplyEditor }: ReplyEditorComponentProps) {
  const ref = useRef(undefined);
  return (
    <div className={cssClass.replayEditorContainer}>
      <LexicalComment ref={ref} />
      <SubmitCommentButton postId={postId} ref={ref} commentId={commentId} />
      <button className={cssClass.buttonCancel} onClick={closeReplyEditor}>
        취소
      </button>
    </div>
  );
}
