import { CommentEditor } from "./CommentEditor.tsx";
import { createComment } from "../../utils/saveComment.ts";
import { MutableRefObject, ReactNode, useRef, useState } from "react";
import { useAuth } from "react-oidc-context";
import Quill from "quill";
import { CommentProps } from "./CommentComponent.tsx";

interface CommentEditorComponentProps {
  postId: string;
  children: ReactNode;
  onDataReceived: (arg0: CommentProps) => void;
  commentId?: string;
}

export function CommentEditorComponent({
  postId,
  children,
  onDataReceived,
  commentId
}: CommentEditorComponentProps) {
  const [isCommentEditorShown, setIsCommentEditorShown] = useState(false);
  const auth = useAuth();
  const commentRef: MutableRefObject<Quill | null> = useRef<Quill>(null);

  function showCommentEditor() {
    setIsCommentEditorShown(true);
  }
  function closeCommentEditor() {
    commentRef.current = null;
    setIsCommentEditorShown(false);
  }

  async function sendCommentAndCloseEditor() {
    const axiosResponse = await createComment({
      postId: postId,
      comment: commentRef.current?.getContents(),
      access_token: auth.user?.access_token,
      commentId: commentId
    });
    closeCommentEditor();
    onDataReceived(axiosResponse?.data);
  }

  return (
    <>
      {isCommentEditorShown ? (
        <>
          <CommentEditor
            ref={commentRef}
          />
          <button onClick={closeCommentEditor}>창 닫기</button>
          <button onClick={sendCommentAndCloseEditor}>입력</button>
        </>
      ) : (
        <button onClick={showCommentEditor}>{children}</button>
      )}
    </>
  );
}
