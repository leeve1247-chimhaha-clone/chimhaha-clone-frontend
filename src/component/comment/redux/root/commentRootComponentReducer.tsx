import type { PayloadAction } from "@reduxjs/toolkit";

import type { CommentRootComponentStateProps } from "./CommentRootComponentStateProps.tsx";

export const commentRootComponentReducer = {
  setCommentPage: (state: CommentRootComponentStateProps, action: PayloadAction<number>) => {
    state.commentPage = action.payload;
  },
  setFocusedButton: (state: CommentRootComponentStateProps, action: PayloadAction<string|undefined>) => {
    state.focusedButton = action.payload;
  }
};


