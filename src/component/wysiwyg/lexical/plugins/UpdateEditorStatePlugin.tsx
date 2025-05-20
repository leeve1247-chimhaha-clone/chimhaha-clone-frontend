import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { DefaultSubmitBodyDispatch, DefaultSubmitBodyState } from "../../../body/redux/submitPost/DefaultSubmitBodyStore.tsx";
import { setContent } from "../../../body/redux/submitPost/submitPostSlice.tsx";

export function UpdateEditorStatePlugin() {
  const [editor] = useLexicalComposerContext();
  const run = useSelector((state: DefaultSubmitBodyState) => state.submitPostStatus.run);
  const dispatch = useDispatch<DefaultSubmitBodyDispatch>();
  useEffect(() => {
    if (!run) return;
    editor.read(() => {
      const editorState = editor.getEditorState();
      const serializedEditorState = editorState.toJSON();
      dispatch(setContent(serializedEditorState));
    });
  }, [dispatch, editor, run]);
  return null;
}
