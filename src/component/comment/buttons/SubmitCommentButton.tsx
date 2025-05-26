import type { RefObject } from "react";
import type { LexicalEditor } from "lexical";
import { useAuth } from "react-oidc-context";
import axios from "axios";
import { CData } from "../../../../credential/data.ts";
import cssClass from "../CommentComponent.module.css";
import { clearImageSrcInEditorState } from "../../body/submit/functions/clearImageSrcInEditorState.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import { isEmpty } from "../../body/submit/IsEmpty.tsx";
import type { CommentProps } from "../CommentProps.tsx";

interface SubmitCommentButtonProps {
  postId: string;
  commentId: number | undefined;
  ref: RefObject<LexicalEditor | undefined>;
  commentPageNum?: number;
}

export function SubmitCommentButton({ postId, commentId, ref, commentPageNum }: SubmitCommentButtonProps) {
  const auth = useAuth();
  const queryClient = useQueryClient();

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
      .then(async (r) => {
        console.log(r.data);
        // root 에서 입력되었다? commentId 가 undefined다?
        // 맨 마지막 pageNum 으로 갱신하고 종료
        await queryClient.invalidateQueries({ queryKey: [...queryKeys.CommentList, postId, commentPageNum] });

        // commentId 가 있다?
        // 해당 commentId 가 있는 페이지로 이동하고 종료
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <button className={cssClass.buttonApply} onClick={submitComment}>
        등록
      </button>
    </>
  );
}
