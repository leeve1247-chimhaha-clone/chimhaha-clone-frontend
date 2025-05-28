import { type ChangeEvent, type KeyboardEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../redux/submitPost/submitPostSlice.tsx";
import type { DefaultSubmitBodyDispatch } from "../redux/submitPost/DefaultSubmitBodyStore.tsx";
import styles from "./DefaultSubmitBody.module.css"
import { useQueryClient } from "@tanstack/react-query";
import type { DefaultPostDetailProps } from "../../post/detail/DefaultPostDetailProps.tsx";
import { queryKeys } from "../../../react-query/queryKeys.tsx";

export function InputTitle() {
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId");
  const queryClient = useQueryClient();
  const postDetailProps = queryClient.getQueryData<DefaultPostDetailProps>([...queryKeys.PostDetail, postId]);
  const [onChangeText, setOnChangeText] = useState(postDetailProps?.title === undefined ? "" : postDetailProps?.title);
  const dispatch = useDispatch<DefaultSubmitBodyDispatch>();

  useEffect(() => {
    if (postDetailProps?.title !== undefined) {
      dispatch(setTitle(postDetailProps?.title));
    }
  }, [dispatch, postDetailProps?.title])

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
  return <input className={styles.title} value={onChangeText} onChange={handleChange} onBlur={setFinalTitle} onKeyDown={handleKeyDown} placeholder={"제목을 입력하세요"} />;
}
