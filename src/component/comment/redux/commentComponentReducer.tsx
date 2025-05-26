import type { PayloadAction } from "@reduxjs/toolkit";

import type { CommentComponentStateProps } from "./CommentComponentStateProps.tsx";
import { commentComponentSlice } from "./commentComponentSlice.tsx";

export const commentComponentReducer = {
  setCommentPage: (state: CommentComponentStateProps, action: PayloadAction<number>) => {
    state.commentPage = action.payload;
  },
  setFocusedButton: (state: CommentComponentStateProps, action: PayloadAction<string|undefined>) => {
    state.focusedButton = action.payload;
  }
};

export const { setCommentPage, setFocusedButton } = commentComponentSlice.actions;
