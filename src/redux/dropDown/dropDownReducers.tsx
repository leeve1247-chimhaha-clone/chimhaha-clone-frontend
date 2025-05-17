import type { HeaderDropDownCategoryState } from "./dropDownSlice.tsx";
import type { PayloadAction } from "@reduxjs/toolkit";

export const dropDownReducers = {
  setHeaderDropDownStatus: (state: HeaderDropDownCategoryState, action: PayloadAction<string>) => {
    state.value = action.payload;
  },
};
