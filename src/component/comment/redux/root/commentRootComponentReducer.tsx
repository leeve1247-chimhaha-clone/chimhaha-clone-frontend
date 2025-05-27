import type { PayloadAction } from "@reduxjs/toolkit";

import type { CommentRootComponentStateProps } from "./CommentRootComponentStateProps.tsx";
import type { SerializedEditorState } from "lexical";

export const commentRootComponentReducer = {
  setCommentPage: (state: CommentRootComponentStateProps, action: PayloadAction<number>) => {
    state.commentPage = action.payload;
  },
  setFocusedButton: (state: CommentRootComponentStateProps, action: PayloadAction<string | undefined>) => {
    state.focusedButton = action.payload;
  },
  setEditableCommentId: (state: CommentRootComponentStateProps, action: PayloadAction<string | undefined>) => {
    state.editableCommentId = action.payload;
  },
  setInitialCommentState: (state: CommentRootComponentStateProps, action: PayloadAction<SerializedEditorState | undefined>) => {
    state.initialCommentState = action.payload;
  },
  setCommentLike: (state: CommentRootComponentStateProps, action: PayloadAction<{ commentId:string, likes:number, selfLiked: boolean }>) => {
    state.commentLikes[ action.payload.commentId ] = {likes: action.payload.likes, selfLiked: action.payload.selfLiked};
  },
};
