import { HeaderDropDownCategory } from "../../component/header/dropdown/HeaderDropDownCategory.tsx";
import type { HeaderDropDownCategoryState } from "./dropDownSlice.tsx";
import type { PayloadAction } from "@reduxjs/toolkit";

export const dropDownReducers = {
  setHeaderDropDownStatus: (state: HeaderDropDownCategoryState, action: PayloadAction<keyof typeof HeaderDropDownCategory | "">) => {
    state.value = action.payload;
  },
};
