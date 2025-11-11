import { type ChangeEvent, type KeyboardEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../redux/post/submit/submitPostSlice.tsx";
import styles from "./PostSubmit.module.css";
import { useQueryClient } from "@tanstack/react-query";
import type { PostDetailProps } from "../detail/PostDetailProps.tsx";
import { queryKeys } from "../../../react-query/queryKeys.tsx";

export function PostSubmitInputTitle() {
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId");
  const queryClient = useQueryClient();
  const postDetailProps = queryClient.getQueryData<PostDetailProps>([...queryKeys.PostDetail, postId]);
  const [onChangeText, setOnChangeText] = useState(postDetailProps?.title === undefined ? "" : postDetailProps?.title);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postDetailProps?.title !== undefined) {
      dispatch(setTitle(postDetailProps?.title));
    }
  }, [dispatch, postDetailProps?.title]);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      setFinalTitle();
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setOnChangeText(event.target.value);
  }

  function setFinalTitle() {
    dispatch(setTitle(onChangeText));
  }
  return (
    <input
      className={styles.title}
      value={onChangeText}
      onChange={handleChange}
      onBlur={setFinalTitle}
      onKeyDown={handleKeyDown}
      placeholder={"제목을 입력하세요"}
    />
  );
}
