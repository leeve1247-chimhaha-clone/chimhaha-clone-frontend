import { createSlice } from "@reduxjs/toolkit";
import { dropDownReducers } from "./dropDownReducers.tsx";
import { dropDownInitialState } from "./dropDownInitialState.tsx";

export interface HeaderDropDownCategoryState {
  value: string;
}

export const dropDownSlice = createSlice({
  name: "headerDropDownStatus",
  initialState: dropDownInitialState,
  reducers: dropDownReducers,
});

export const { setHeaderDropDownStatus } = dropDownSlice.actions;
