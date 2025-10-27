import type {RefObject} from "react";
import type {LexicalEditor} from "lexical";
import {useDispatch, useSelector} from "react-redux";
import {setEditableCommentId} from "../../../redux/comment/commentRootComponentSlice.tsx";
import type {RootState} from "../../../redux/store.tsx";

export function CancelUpdateButton({ ref }: { ref: RefObject<LexicalEditor | undefined> }) {
  const initialCommentState = useSelector((state: RootState) => state.commentRootComponentStatus.initialCommentState);
  const dispatch = useDispatch();

  function handleCancelEditedComment() {
    const editor = ref.current;
    if (editor === undefined) return;
    if (initialCommentState === undefined) return;
    const editorState = editor.parseEditorState(initialCommentState);
    editor.setEditorState(editorState);
    dispatch(setEditableCommentId(undefined));
  }

  return <button onClick={handleCancelEditedComment}>취소</button>;
}
