import { PayloadAction } from "@reduxjs/toolkit";
import { HeaderDropDownCategory } from "../../component/header/dropdown/HeaderDropDownCategory.tsx";
import { HeaderDropDownCategoryState } from "./dropDownSlice.tsx";

export const dropDownReducers = {
  setHeaderDropDownStatus: (state: HeaderDropDownCategoryState, action: PayloadAction<keyof typeof HeaderDropDownCategory | "">) => {
    state.value = action.payload;
  }
};
