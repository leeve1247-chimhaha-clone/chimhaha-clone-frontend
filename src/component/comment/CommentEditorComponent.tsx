import { CommentEditor } from "./CommentEditor.tsx";
import { saveComment } from "../../utils/saveComment.ts";
import { MutableRefObject, useRef, useState } from "react";
import { useAuth } from "react-oidc-context";
import Quill from "quill";

export function CommentEditorComponent({ postId }: { postId: string }) {
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

  return (
    <>
      {isCommentEditorShown ? (
        <>
          <CommentEditor
            ref={commentRef}
            isCommentEditorShown={isCommentEditorShown}
          />
          <button onClick={closeCommentEditor}>창 닫기</button>
          <button
            onClick={async () => {
              await saveComment(
                postId,
                commentRef.current?.getContents(),
                auth?.user?.profile.sub,
                auth.user?.access_token,
              );
              closeCommentEditor();
            }}
          >
            댓글 입력
          </button>
        </>
      ) : (
        <button onClick={showCommentEditor}>
          이 버튼을 눌러야 하위 창이 표시된다구?
        </button>
      )}
    </>
  );
}
