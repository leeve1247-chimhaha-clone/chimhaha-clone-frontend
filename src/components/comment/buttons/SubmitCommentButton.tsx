import type { RefObject } from "react";
import { type LexicalEditor } from "lexical";
import { useAuth } from "react-oidc-context";
import axios from "axios";
import { CData } from "../../../../credential/data.ts";
import styles from "../CommentComponent.module.css";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import { isEmpty } from "../../post/submit/functions/isEmpty.ts";
import { useDispatch } from "react-redux";
import { setCommentPage } from "../../../redux/comment/commentRootComponentSlice.tsx";
import emptyEditor from "../../../../public/empty_editor_state.json";

interface SubmitCommentButtonProps {
  postId: string;
  commentId?: number;
  ref: RefObject<LexicalEditor | undefined>;
  commentPageNum?: number;
}

export function SubmitCommentButton({ postId, commentId, ref }: SubmitCommentButtonProps) {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  async function submitComment() {
    if (ref.current === undefined) return;
    const editor = ref.current;
    const editorState = editor.getEditorState();
    const content = editorState.toJSON();
    if (isEmpty(content)) return;
    const commentData = {
      postId: postId,
      commentId: commentId,
      content: content,
    };
    const access_token = auth?.user?.access_token;
    const commentPage = await axios
      .post<number>(CData.local_backend + "/save/comment", commentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch(() => undefined);
    if (!commentPage) return;
    await queryClient.invalidateQueries({ queryKey: [...queryKeys.CommentPageSize, postId] });
    await queryClient.invalidateQueries({ queryKey: [...queryKeys.CommentList, postId, String(commentPage)] });
    dispatch(setCommentPage(commentPage));
    const emptyEditorState = editor.parseEditorState(JSON.stringify(emptyEditor));
    editor.setEditorState(emptyEditorState);
  }

  return (
    <>
      <button className={styles.buttonApply} onClick={submitComment}>
        등록
      </button>
    </>
  );
}
