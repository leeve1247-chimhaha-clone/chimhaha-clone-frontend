import { createSlice } from "@reduxjs/toolkit";
import { commentComponentReducer } from "./submitPostReducers.tsx";
import { commentComponentInitialState } from "./submitPostInitialState.tsx";

export const commentComponentSlice = createSlice({
  name: "commentComponentState",
  initialState: commentComponentInitialState,
  reducers: commentComponentReducer,
});

export const { setCommentPage } = commentComponentSlice.actions;
