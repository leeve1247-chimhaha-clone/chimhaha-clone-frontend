import { createSlice } from "@reduxjs/toolkit";
import { HeaderDropDownCategory } from "../../component/header/dropdown/HeaderDropDownCategory.tsx";
import { dropDownReducers } from "./dropDownReducers.tsx";
import { dropDownInitialState } from "./dropDownInitialState.tsx";

export interface HeaderDropDownCategoryState {
  value: keyof typeof HeaderDropDownCategory | "";
}

export const dropDownSlice = createSlice({
  name: "headerDropDownStatus",
  initialState: dropDownInitialState,
  reducers: dropDownReducers,
});

export const { setHeaderDropDownStatus } = dropDownSlice.actions;
