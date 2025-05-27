import type { RefObject } from "react";
import type { LexicalEditor } from "lexical";
import { useDispatch, useSelector } from "react-redux";
import type {
  CommentRootComponentDispatch,
  CommentRootComponentState
} from "../redux/root/commentRootComponentStore.tsx";
import { setEditableCommentId } from "../redux/root/commentRootComponentSlice.tsx";

export function CancelUpdateButton({ ref }: { ref: RefObject<LexicalEditor | undefined> }) {
  const initialCommentState = useSelector((state: CommentRootComponentState) => state.commentComponentState.initialCommentState);
  const dispatch = useDispatch<CommentRootComponentDispatch>();

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
