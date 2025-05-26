import { configureStore } from "@reduxjs/toolkit";
import { commentComponentSlice } from "./commentComponentSlice.tsx";

export const commentComponentStore = configureStore({
  reducer: {
    commentComponentState: commentComponentSlice.reducer,
  },
});

export type CommentComponentState = ReturnType<typeof commentComponentStore.getState>;
export type CommentComponentDispatch = typeof commentComponentStore.dispatch;
