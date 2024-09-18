import { CommentEditor } from "./CommentEditor.tsx";
import { createComment } from "../../utils/saveComment.ts";
import {forwardRef, MutableRefObject, ReactNode, useRef} from "react";
import { useAuth } from "react-oidc-context";
import Quill from "quill";
import { CommentProps } from "./CommentComponent.tsx";
import cssClass from "./CommentEditorComponent.module.css";

interface CommentEditorComponentProps {
  postId: string;
  onDataReceived: (arg0: CommentProps) => void;
  children?: ReactNode;
  commentId?: string;
  initOpen?: boolean;
  closeReplyEditor?: () => void;
}

export const CommentEditorComponent = forwardRef<HTMLDivElement, CommentEditorComponentProps>(
    ({postId, onDataReceived, commentId, closeReplyEditor}, targetRef)=> {
  const auth = useAuth();
  const commentRef: MutableRefObject<Quill | null> = useRef<Quill>(null);

  async function sendCommentAndCloseEditor() {
    const axiosResponse = await createComment({
      postId: postId,
      comment: commentRef.current?.getContents(),
      access_token: auth.user?.access_token,
      commentId: commentId,
    });
    onDataReceived(axiosResponse?.data);
    if (closeReplyEditor) closeReplyEditor();
  }

  return (
      <div ref = {targetRef} className={cssClass.editorContainer}>
        <CommentEditor ref={commentRef} commentId={commentId} />
        <div className={cssClass.editorContainerButton}>
          <button className={cssClass.buttonApply} onClick={sendCommentAndCloseEditor}>
            등록
          </button>
          {commentId && (
              <button className={cssClass.buttonCancel} onClick={closeReplyEditor}>
                취소
              </button>
          )}
        </div>
      </div>
  );
});
