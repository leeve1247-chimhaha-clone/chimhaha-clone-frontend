import { CommentEditor } from "./CommentEditor.tsx";
import { saveComment } from "../../utils/saveComment.ts";
import { MutableRefObject, ReactNode, useRef, useState } from "react";
import { useAuth } from "react-oidc-context";
import Quill from "quill";

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

  function showCommentEditor() {
    setIsCommentEditorShown(true);
  }
  function closeCommentEditor() {
    commentRef.current = null;
    setIsCommentEditorShown(false);
  }

  async function sendCommentAndCloseEditor() {
    await saveComment(
      postId,
      commentRef.current?.getContents(),
      auth?.user?.profile.sub,
      auth.user?.access_token,
      commentId,
    );
    closeCommentEditor();
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
