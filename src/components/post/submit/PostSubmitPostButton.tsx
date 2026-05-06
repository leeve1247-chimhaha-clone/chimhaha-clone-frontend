import type { LexicalEditor } from "lexical";
import { type RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "react-oidc-context";
import { useLocation, useMatches } from "react-router";
import { setCategory } from "../../../redux/post/submit/submitPostSlice.tsx";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import styles from "./PostSubmit.module.css";
import { isEmpty } from "./functions/isEmpty.ts";
import type { RootState } from "../../../redux/store.tsx";
import { postApi } from "../../../api/postApi.ts";

export function PostSubmitPostButton({ ref }: { ref: RefObject<LexicalEditor | undefined> }) {
  const selector = useSelector((state: RootState) => state.submitPostStatus);
  const dispatch = useDispatch();
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
    const { title, category } = selector;
    if (!title || !category) return;
    const editor = ref.current;
    editor.read(() => {
      const editorState = editor.getEditorState();
      const content = editorState.toJSON();
      if (isEmpty(content)) return;
      if (matches.length < 2) return;
      const access_token = auth?.user?.access_token;
      if (!access_token) return;
      postApi
        .updatePost({ title, category, content, postId }, access_token)
        .then(async (postNum) => {
          await queryClient.invalidateQueries({ queryKey: [...queryKeys.PostDetail, postId] });
          navigate("/" + category + "/" + postNum);
        });
    });
  }

  function submitPost() {
    if (ref.current === undefined) return;
    const { title, category } = selector;
    if (!title || !category) return;
    const editor = ref.current;
    editor.read(() => {
      const editorState = editor.getEditorState();
      const content = editorState.toJSON();
      if (isEmpty(content)) return;
      if (matches.length < 2) return;
      console.log(content);
      const access_token = auth?.user?.access_token;
      if (!access_token) return;
      postApi
        .savePost({ title, category, content }, access_token)
        .then((postNum) => {
          navigate("/" + category + "/" + postNum);
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
