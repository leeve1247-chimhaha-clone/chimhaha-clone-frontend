import {createSlice} from "@reduxjs/toolkit";
import {defaultPostDetailInitialState} from "./defaultPostDetailInitialState.tsx";
import {defaultPostDetailReducers} from "./defaultPostDetailReducers.tsx";

export const defaultPostDetailSlice = createSlice({
  name: "defaultPostDetailStore",
  initialState: defaultPostDetailInitialState,
  reducers: defaultPostDetailReducers,
});

export const { setLikes } = defaultPostDetailSlice.actions;
