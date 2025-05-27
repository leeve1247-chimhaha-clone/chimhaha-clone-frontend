import type { RefObject } from "react";
import type { LexicalEditor } from "lexical";
import { useAuth } from "react-oidc-context";
import axios from "axios";
import { CData } from "../../../../credential/data.ts";
import styles from "../CommentComponent.module.css";
import { clearImageSrcInEditorState } from "../../body/submit/functions/clearImageSrcInEditorState.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import { isEmpty } from "../../body/submit/IsEmpty.tsx";
import type { CommentProps } from "../CommentProps.tsx";
import { useDispatch } from "react-redux";
import type { CommentRootComponentDispatch } from "../redux/root/commentRootComponentStore.tsx";
import { setCommentPage } from "../redux/root/commentRootComponentSlice.tsx";

interface SubmitCommentButtonProps {
  postId: string;
  commentId?: number;
  ref: RefObject<LexicalEditor | undefined>;
  commentPageNum?: number;
}

export function SubmitCommentButton({ postId, commentId, ref }: SubmitCommentButtonProps) {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const dispatch = useDispatch<CommentRootComponentDispatch>();

  async function submitComment() {
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

    await axios
      .post<CommentProps>(CData.local_backend + "/save/comment", commentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(async () => {
        await queryClient.invalidateQueries({ queryKey: [...queryKeys.CommentPageSize, postId]});
        const commentPageSize = queryClient.getQueryData<number>([...queryKeys.CommentPageSize, postId]);
        if (commentPageSize === undefined) return;
        await queryClient.invalidateQueries({ queryKey: [...queryKeys.CommentList, postId, String(commentPageSize)] });
        dispatch(setCommentPage(commentPageSize));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <button className={styles.buttonApply} onClick={submitComment}>
        등록
      </button>
    </>
  );
}
