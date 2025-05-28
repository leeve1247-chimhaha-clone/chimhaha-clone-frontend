import type { PayloadAction } from "@reduxjs/toolkit";

import type { CommentRootComponentReduxProps } from "./CommentRootComponentReduxProps.tsx";
import type { SerializedEditorState } from "lexical";

export const commentRootComponentReducer = {
  setCommentPage: (state: CommentRootComponentReduxProps, action: PayloadAction<number>) => {
    state.commentPage = action.payload;
  },
  setFocusedButton: (state: CommentRootComponentReduxProps, action: PayloadAction<string | undefined>) => {
    state.focusedButton = action.payload;
  },
  setEditableCommentId: (state: CommentRootComponentReduxProps, action: PayloadAction<string | undefined>) => {
    state.editableCommentId = action.payload;
  },
  setInitialCommentState: (state: CommentRootComponentReduxProps, action: PayloadAction<SerializedEditorState | undefined>) => {
    state.initialCommentState = action.payload;
  },
  setCommentLike: (state: CommentRootComponentReduxProps, action: PayloadAction<{ commentId:string, likes:number, selfLiked: boolean }>) => {
    state.commentLikes[ action.payload.commentId ] = {likes: action.payload.likes, selfLiked: action.payload.selfLiked};
  },
};
