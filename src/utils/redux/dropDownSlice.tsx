import { createSlice } from "@reduxjs/toolkit";
import { HeaderDropDownCategory } from "../../component/header/dropdown/HeaderDropDownCategory.tsx";

export interface HeaderDropDownCategoryState {
  value: keyof typeof HeaderDropDownCategory | "";
}

const initialState: HeaderDropDownCategoryState = {
  value: "",
};

const reducers = {
  setHeaderDropDownStatus: (state: HeaderDropDownCategoryState, action: { payload: keyof typeof HeaderDropDownCategory | "" }) => {
    state.value = action.payload;
  },
};

export const dropDownSlice = createSlice({
  name: "headerDropDownStatus",
  initialState: initialState,
  reducers: reducers,
});

export const { setHeaderDropDownStatus } = dropDownSlice.actions;