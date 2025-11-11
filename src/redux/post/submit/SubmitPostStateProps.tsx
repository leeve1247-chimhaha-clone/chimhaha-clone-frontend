import type { SerializedEditorState } from "lexical";

export interface SubmitPostStateProps {
  title: string | undefined;
  content: SerializedEditorState | undefined;
  category: string | undefined;
  isUpdateOrdered: boolean | undefined;
  run: boolean
}
