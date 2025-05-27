import type { CommentRootComponentStateProps } from "./CommentRootComponentStateProps.tsx";

export const commentRootComponentInitialState: CommentRootComponentStateProps = {
  commentPage: 1,
  focusedButton: undefined,
  editableCommentId: undefined,
  initialCommentState: undefined,
  commentLikes: {},
};
