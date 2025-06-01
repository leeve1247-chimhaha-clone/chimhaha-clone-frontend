import { Lexical } from "../../wysiwyg/lexical/Lexical.tsx";
import { PostSubmitPostButton } from "./PostSubmitPostButton.tsx";
import { useRef } from "react";
import type { LexicalEditor } from "lexical";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import type { PostDetailProps } from "../detail/PostDetailProps.tsx";
import styles from "./PostSubmit.module.css";
import axios from "axios";
import { CData } from "../../../../credential/data.ts";
import { PostSubmitHeader } from "./header/PostSubmitHeader.tsx";

function CancelPostButton() {
  return <button className={styles.buttonCancel}>취소</button>;
}

export function PostSubmit() {
  const ref = useRef<LexicalEditor>(undefined);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId");

  async function fetchPostDetail() {
    if (postId === null) return "";
    return axios.get<PostDetailProps>(CData.local_backend + "/posts/detail?num=" + postId).then((res) => {
      return res.data;
    });
  }

  const { isLoading, error } = useQuery({ queryKey: [...queryKeys.PostDetail, postId], queryFn: fetchPostDetail });
  if (isLoading) return <div>isLoading</div>;
  if (error) return <div>error</div>;
  return (
    <div className={styles.container}>
      <PostSubmitHeader />
      <Lexical ref={ref} postId={postId !== null ? postId : undefined} />
      <div className={styles.vote}>투표설정</div>
      <div className={styles.categoryFixed}>태그</div>
      <div className={styles.tail}>
        <PostSubmitPostButton ref={ref} />
        <CancelPostButton />
      </div>
    </div>
  );
}
