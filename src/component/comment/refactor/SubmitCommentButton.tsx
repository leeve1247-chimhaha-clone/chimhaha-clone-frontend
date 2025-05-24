import type { RefObject } from "react";
import type { LexicalEditor } from "lexical";
import { isEmpty } from "../../body/submit/SubmitPostButton.tsx";
import { useAuth } from "react-oidc-context";
import axios from "axios";
import { CData } from "../../../../credential/data.ts";
import cssClass from "../CommentComponent.module.css";
import { clearImageSrcInEditorState } from "../../body/submit/functions/clearImageSrcInEditorState.tsx";
import { useQueryClient } from "@tanstack/react-query";
import type { DefaultPostDetailProps } from "../../body/DefaultPostDetailProps.tsx";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import type { CommentProps } from "../CommentComponent.tsx";

interface SubmitCommentButtonProps {
  postId: string;
  commentId: number | undefined;
  ref: RefObject<LexicalEditor | undefined>;
}

export function SubmitCommentButton({ postId, commentId, ref }: SubmitCommentButtonProps) {
  const auth = useAuth();
  const queryClient = useQueryClient();

  function updateComment(oldData: DefaultPostDetailProps, comment: CommentProps) {
    if (commentId === undefined){
      return { ...oldData, comments: [...oldData.comments, comment] };
    } else {
      return oldData
    }
  }

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
      .post<CommentProps>(CData.local_backend + "/save/comment", commentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((r) => {
        queryClient.setQueryData(
          [...queryKeys.PostDetail, postId],
          (oldData: DefaultPostDetailProps) => {
          return updateComment(oldData, r.data);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <button className={cssClass.buttonApply} onClick={submitComment}>
      등록
    </button>
  );
}
