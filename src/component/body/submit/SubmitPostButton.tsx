import type { LexicalEditor } from "lexical";
import { type RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { DefaultSubmitBodyDispatch, DefaultSubmitBodyState } from "../redux/submitPost/DefaultSubmitBodyStore.tsx";
import axios from "axios";
import { CData } from "../../../../credential/data.ts";
import { useAuth } from "react-oidc-context";
import { useLocation, useMatches } from "react-router";
import { setCategory } from "../redux/submitPost/submitPostSlice.tsx";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import styles from "./DefaultSubmitBody.module.css";
import { clearImageSrcInEditorState } from "./functions/clearImageSrcInEditorState.tsx";
import { isEmpty } from "./IsEmpty.tsx";

export function SubmitPostButton({ ref }: { ref: RefObject<LexicalEditor | undefined> }) {
  const selector = useSelector((state: DefaultSubmitBodyState) => state.submitPostStatus);
  const dispatch = useDispatch<DefaultSubmitBodyDispatch>();
  const matches = useMatches();
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId");

  if (selector.category === undefined) {
    const category = matches[1].pathname.substring(1, matches[1].pathname.length);
    dispatch(setCategory(category));
  }

  function editPost() {
    if (ref.current === undefined) return;
    const editor = ref.current;
    editor.read(() => {
      const editorState = editor.getEditorState();
      const content = editorState.toJSON();
      if (isEmpty(content)) return;
      if (matches.length < 2) return;
      clearImageSrcInEditorState(content);

      const postData = {
        title: selector.title,
        category: selector.category,
        content: content,
        postId: postId,
      };

      const access_token = auth?.user?.access_token;
      axios
        .post(CData.local_backend + "/update", postData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(async (r) => {
          await queryClient.invalidateQueries({ queryKey: [...queryKeys.PostDetail, postId] });
          navigate("/" + selector.category + "/" + r.data);
        });
    });
  }

  function submitPost() {
    if (ref.current === undefined) return;
    const editor = ref.current;
    editor.read(() => {
      const editorState = editor.getEditorState();
      const content = editorState.toJSON();
      if (isEmpty(content)) return;
      if (matches.length < 2) return;
      clearImageSrcInEditorState(content);

      const postData = {
        title: selector.title,
        category: selector.category,
        content: content,
      };

      const access_token = auth?.user?.access_token;
      axios
        .post(CData.local_backend + "/save", postData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((r) => {
          navigate("/" + selector.category + "/" + r.data);
        });
    });
  }

  return (
    <>
      {(postId === undefined || postId === null) && (
        <button className={styles.buttonApply} onClick={submitPost}>
          등록
        </button>
      )}
      {postId !== undefined && postId !== null && (
        <button className={styles.buttonApply} onClick={editPost}>
          수정
        </button>
      )}
    </>
  );
}
