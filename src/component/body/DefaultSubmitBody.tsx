import { Lexical } from "../wysiwyg/lexical/Lexical.tsx";
import { InputTitle } from "./InputTitle.tsx";
import { Provider } from "react-redux";
import { defaultSubmitBodyStore } from "./redux/submitPost/DefaultSubmitBodyStore.tsx";
import { SubmitPostButton } from "./SubmitPostButton.tsx";
import { useRef } from "react";
import type { LexicalEditor } from "lexical";
import { useLocation } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../header/queryKeys.tsx";
import type { DefaultPostDetailProps } from "./DefaultPostDetailProps.tsx";

function CancelButton() {
  return <div>취소</div>;
}

export function DefaultSubmitBody() {
  const ref = useRef<LexicalEditor>(undefined);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId");
  const queryClient = useQueryClient();
  const postDetailProps = queryClient.getQueryData<DefaultPostDetailProps>([...queryKeys.PostDetail, postId]);
  return (
    <Provider store={defaultSubmitBodyStore}>
      <div>
        <div>대분류</div>
        <div>소분류</div>
        <InputTitle initText={postDetailProps?.title} />
      </div>
      <Lexical ref={ref} postId={postId !== null ? postId : undefined} />
      <div>
        <SubmitPostButton postId={postDetailProps?.postId} ref={ref} />
        <CancelButton />
      </div>
      <div>DefaultSubmitBody</div>
    </Provider>
  );
}
