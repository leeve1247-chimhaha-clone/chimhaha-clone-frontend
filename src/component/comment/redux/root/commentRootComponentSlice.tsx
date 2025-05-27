import { createSlice } from "@reduxjs/toolkit";
import { commentRootComponentReducer } from "./commentRootComponentReducer.tsx";
import { commentRootComponentInitialState } from "./commentRootComponentInitialState.tsx";

export const commentRootComponentSlice = createSlice({
  name: "commentComponentState",
  initialState: commentRootComponentInitialState,
  reducers: commentRootComponentReducer,
});

export const { setCommentPage, setFocusedButton } = commentRootComponentSlice.actions;
