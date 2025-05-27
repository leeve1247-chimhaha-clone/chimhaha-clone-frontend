import { configureStore } from "@reduxjs/toolkit";
import { commentRootComponentSlice } from "./commentRootComponentSlice.tsx";

export const commentRootComponentStore = configureStore({
  reducer: {
    commentComponentState: commentRootComponentSlice.reducer,
  },
});

export type CommentRootComponentState = ReturnType<typeof commentRootComponentStore.getState>;
export type CommentRootComponentDispatch = typeof commentRootComponentStore.dispatch;
