import {createSlice} from "@reduxjs/toolkit";
import {submitPostReducers} from "./submitPostReducers.tsx";
import {submitPostInitialState} from "./submitPostInitialState.tsx";

export const submitPostSlice = createSlice({
  name: "submitPostStatus",
  initialState: submitPostInitialState,
  reducers: submitPostReducers,
});

export const { setTitle, setCategory, initSubmits } = submitPostSlice.actions;
