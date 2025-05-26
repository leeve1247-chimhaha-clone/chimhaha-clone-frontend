import type { PayloadAction } from "@reduxjs/toolkit";

import type { CommentComponentStateProps } from "./CommentComponentStateProps.tsx";

export const commentComponentReducer = {
  setCommentPage: (state: CommentComponentStateProps, action: PayloadAction<number>) => {
    state.commentPage = action.payload;
  },
};
