import { configureStore } from "@reduxjs/toolkit";
import { defaultPostDetailSlice } from "./defaultPostDetailSlice.tsx";

export const defaultPostDetailStore = configureStore({
  reducer: {
    defaultPostDetailStore: defaultPostDetailSlice.reducer,
  },
});

export type DefaultPostDetailState = ReturnType<typeof defaultPostDetailStore.getState>;
export type DefaultPostDetailDispatch = typeof defaultPostDetailStore.dispatch;
