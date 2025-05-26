import { createSlice } from "@reduxjs/toolkit";
import { commentComponentReducer } from "./commentComponentReducer.tsx";
import { commentComponentInitialState } from "./commentComponentInitialState.tsx";

export const commentComponentSlice = createSlice({
  name: "commentComponentState",
  initialState: commentComponentInitialState,
  reducers: commentComponentReducer,
});


