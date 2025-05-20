import type { LexicalEditor, SerializedEditorState } from "lexical";
import EMPTY_EDITOR_STATE_JSON from "../../../public/empty_editor_state.json";
import { type RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { DefaultSubmitBodyDispatch, DefaultSubmitBodyState } from "./redux/submitPost/DefaultSubmitBodyStore.tsx";
import axios from "axios";
import { CData } from "../../../credential/data.ts";
import { useAuth } from "react-oidc-context";
import { useMatches } from "react-router";
import { setCategory } from "./redux/submitPost/submitPostSlice.tsx";

function isEmpty(content: SerializedEditorState) {
  return JSON.stringify(content) === JSON.stringify(EMPTY_EDITOR_STATE_JSON);
}

export function SubmitPostButton({ ref }: { ref: RefObject<LexicalEditor | undefined> }) {
  const selector = useSelector((state: DefaultSubmitBodyState) => state.submitPostStatus);
  const dispatch = useDispatch<DefaultSubmitBodyDispatch>();
  const matches = useMatches();
  const auth = useAuth();

  if (selector.category === undefined){
    const category = matches[1].pathname.substring(1, matches[1].pathname.length);
    dispatch(setCategory(category))
  }

  function submitPost() {
    if (ref.current === undefined) return;
    const editor = ref.current;
    editor.read(() => {
      const editorState = editor.getEditorState();
      const content = editorState.toJSON();
      if (isEmpty(content)) return;
      if (matches.length < 2) return;


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
          console.log(r.data);
        });
    });
  }

  return <div onClick={submitPost}>등록</div>;
}
