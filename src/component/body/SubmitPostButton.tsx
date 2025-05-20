import { useDispatch, useSelector } from "react-redux";
import type { DefaultSubmitBodyDispatch, DefaultSubmitBodyState } from "./redux/submitPost/DefaultSubmitBodyStore.tsx";
import { setCategory, startSubmitPost, stopSubmitPost } from "./redux/submitPost/submitPostSlice.tsx";
import type { SerializedEditorState } from "lexical";
import EMPTY_EDITOR_STATE_JSON from "../../../public/empty_editor_state.json";
import { useEffect } from "react";
import { useMatches } from "react-router";

function isEmpty(content: SerializedEditorState) {
  return JSON.stringify(content) === JSON.stringify(EMPTY_EDITOR_STATE_JSON);
}

export function SubmitPostButton() {
  const dispatch = useDispatch<DefaultSubmitBodyDispatch>();
  const run = useSelector((state: DefaultSubmitBodyState) => state.submitPostStatus.run);
  const content = useSelector((state: DefaultSubmitBodyState) => state.submitPostStatus.content);
  const title = useSelector((state: DefaultSubmitBodyState) => state.submitPostStatus.title);
  const category = useSelector((state: DefaultSubmitBodyState) => state.submitPostStatus.category);
  const matches = useMatches();

  function submitPost() {
    dispatch(startSubmitPost());
  }

  useEffect(() => {
    if (!run) return;
    if (content === undefined) return;
    if (isEmpty(content)) return;
    if (title === undefined || title === "") return;

    if (category === undefined) {
      const category = matches[1].pathname.substring(1, matches[1].pathname.length);
      dispatch(setCategory(category));
    }



    dispatch(stopSubmitPost());
  }, [category, content, dispatch, matches, run, title]);

  return <div onClick={submitPost}>등록</div>;
}
