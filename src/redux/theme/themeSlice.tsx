import {createSlice} from "@reduxjs/toolkit";
import {themeInitialState} from "./themeInitialState.tsx";
import {themeReducers} from "./themeReducers.tsx";

export const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  reducers: themeReducers,
});

// Action creators are generated for each case reducer function
export const { setTheme } = themeSlice.actions;
