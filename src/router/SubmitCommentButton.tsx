import type { RefObject } from "react";
import type { LexicalEditor } from "lexical";
import { clearImageSrcInEditorState, isEmpty } from "../component/body/SubmitPostButton.tsx";
import { useAuth } from "react-oidc-context";
import axios from "axios";
import { CData } from "../../credential/data.ts";
import cssClass from "../component/comment/CommentComponent.module.css";

interface SubmitCommentButtonProps {
  postId: number;
  commentId: number | undefined;
  ref: RefObject<LexicalEditor | undefined>;
}

export function SubmitCommentButton({ postId, commentId, ref }: SubmitCommentButtonProps) {
  const auth = useAuth();

  function submitComment() {
    if (ref.current === undefined) return;
    const editor = ref.current;
    const editorState = editor.getEditorState();
    const content = editorState.toJSON();
    clearImageSrcInEditorState(content);
    if (isEmpty(content)) return;

    const commentData = {
      postId: postId,
      commentId: commentId,
      content: content,
    };

    const access_token = auth?.user?.access_token;
    axios
      .post(CData.local_backend + "/save/comment", commentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((r) => {
        console.log(r.data);
      });
  }

  return (
    <button className={cssClass.buttonApply} onClick={submitComment}>
      등록
    </button>
  );
}
