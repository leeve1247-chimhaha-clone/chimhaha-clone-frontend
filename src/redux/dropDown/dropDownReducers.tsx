import type { PayloadAction } from "@reduxjs/toolkit";
import type { DropDownReduxProps } from "./DropDownReduxProps.tsx";

export const dropDownReducers = {
  setHeaderDropDownStatus: (state: DropDownReduxProps, action: PayloadAction<string>) => {
    state.value = action.payload;
  },
};
