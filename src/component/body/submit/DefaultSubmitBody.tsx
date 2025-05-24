import { Lexical } from "../../wysiwyg/lexical/Lexical.tsx";
import { Provider } from "react-redux";
import { defaultSubmitBodyStore } from "../redux/submitPost/DefaultSubmitBodyStore.tsx";
import { SubmitPostButton } from "./SubmitPostButton.tsx";
import { useRef } from "react";
import type { LexicalEditor } from "lexical";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/queryKeys.tsx";
import type { DefaultPostDetailProps } from "../DefaultPostDetailProps.tsx";
import styles from "./DefaultSubmitBody.module.css";
import axios from "axios";
import { CData } from "../../../../credential/data.ts";
import { DefaultSubmitBodyHeader } from "./header/DefaultSubmitBodyHeader.tsx";

function CancelButton() {
  return <button className={styles.buttonCancel}>취소</button>;
}

export function DefaultSubmitBody() {
  const ref = useRef<LexicalEditor>(undefined);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId");

  async function fetchPostDetail() {
    if (postId === null) return "";
    return axios.get<DefaultPostDetailProps>(CData.local_backend + "/posts/detail?num=" + postId).then((res) => {
      return res.data;
    });
  }
  const { isLoading, error } = useQuery({ queryKey: [...queryKeys.PostDetail, postId], queryFn: fetchPostDetail });
  if (isLoading) return <div>isLoading</div>;
  if (error) return <div>error</div>;
  return (
    <Provider store={defaultSubmitBodyStore}>
      <div className={styles.container}>
        <DefaultSubmitBodyHeader />
        <Lexical ref={ref} postId={postId !== null ? postId : undefined} />
        <div className={styles.tail}>
          <SubmitPostButton ref={ref} />
          <CancelButton />
        </div>
      </div>
    </Provider>
  );
}
