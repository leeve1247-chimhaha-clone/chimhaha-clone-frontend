import type {SerializedEditorState} from "lexical";
import EMPTY_EDITOR_STATE_JSON from "../../../../../public/empty_editor_state.json";

export function isEmpty(content: SerializedEditorState) {
  return JSON.stringify(content) === JSON.stringify(EMPTY_EDITOR_STATE_JSON);
}
