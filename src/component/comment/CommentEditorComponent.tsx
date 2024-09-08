import { CommentEditor } from "./CommentEditor.tsx";
import { saveComment } from "../../utils/saveComment.ts";
import { MutableRefObject, ReactNode, useRef, useState } from "react";
import { useAuth } from "react-oidc-context";
import Quill from "quill";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

interface CommentEditorComponentProps {
  postId: string;
  commentId?: string;
  children: ReactNode;
}

export function CommentEditorComponent({
  postId,
  commentId,
  children,
}: CommentEditorComponentProps) {
  const [isCommentEditorShown, setIsCommentEditorShown] = useState(false);
  const auth = useAuth();
  const commentRef: MutableRefObject<Quill | null> = useRef<Quill>(null);
  const location = useLocation();
  const navigate= useNavigate();

  function showCommentEditor() {
    setIsCommentEditorShown(true);
  }
  function closeCommentEditor() {
    commentRef.current = null;
    setIsCommentEditorShown(false);
  }

  async function sendCommentAndCloseEditor() {
    await saveComment({
      postId: postId,
      comment: commentRef.current?.getContents(),
      user: auth?.user?.profile.sub,
      access_token: auth.user?.access_token,
      commentId: commentId,
    });
    closeCommentEditor()
    navigate(location.pathname)
  }

  return (
    <>
      {isCommentEditorShown ? (
        <>
          <CommentEditor
            ref={commentRef}
            isCommentEditorShown={isCommentEditorShown}
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
