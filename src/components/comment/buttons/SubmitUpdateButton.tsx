import {useAuth} from "react-oidc-context";
import type {RefObject} from "react";
import type {LexicalEditor} from "lexical";
import {clearImageSrcInEditorState} from "../../post/submit/functions/clearImageSrcInEditorState.ts";
import {isEmpty} from "../../post/submit/functions/isEmpty.ts";
import axios from "axios";
import {CData} from "../../../../credential/data.ts";
import {useDispatch} from "react-redux";
import {setCommentPage, setEditableCommentId} from "../../../redux/comment/commentRootComponentSlice.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "../../../react-query/queryKeys.tsx";

interface SubmitUpdateButton {
  postId: string;
  commentId: string;
  ref: RefObject<LexicalEditor | undefined>;
}

export function SubmitUpdateButton({ postId, commentId, ref }: SubmitUpdateButton) {
  const dispatch = useDispatch();
  const auth = useAuth();
  const queryClient = useQueryClient();

  async function submitComment() {
    dispatch(setEditableCommentId(undefined));
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
    const pageNum = await axios
      .post<number>(CData.local_backend + "/update/comment", commentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data)
      .catch(() => undefined);
    console.log(pageNum);
    if (pageNum === undefined) return;
    await queryClient.invalidateQueries({ queryKey: [...queryKeys.CommentPageSize, postId] })
    await queryClient.invalidateQueries({ queryKey: [...queryKeys.CommentList, postId, String(pageNum)] });
    dispatch(setCommentPage(pageNum));
  }

  return <button onClick={submitComment}>수정</button>;
}
