import type { SerializedEditorState } from "lexical";

export interface CommentRootComponentStateProps {
  commentPage: undefined | number;
  focusedButton: undefined | string;
  editableCommentId: undefined | string;
  initialCommentState: undefined | SerializedEditorState;
  commentLikes: { [key: string]: {
    likes: number;
    selfLiked: boolean;
    } };
}
