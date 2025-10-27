import type {CommentRootComponentReduxProps} from "./CommentRootComponentReduxProps.tsx";

export const commentRootComponentInitialState: CommentRootComponentReduxProps = {
  commentPage: 1,
  focusedButton: undefined,
  editableCommentId: undefined,
  initialCommentState: undefined,
  commentLikes: {},
};
