import { configureStore } from "@reduxjs/toolkit";
import { submitPostSlice } from "./submitPostSlice.tsx";

export const defaultSubmitBodyStore = configureStore({
  reducer: {
    submitPostStatus: submitPostSlice.reducer,
  },
});

export type DefaultSubmitBodyState = ReturnType<typeof defaultSubmitBodyStore.getState>;
export type DefaultSubmitBodyDispatch = typeof defaultSubmitBodyStore.dispatch;
