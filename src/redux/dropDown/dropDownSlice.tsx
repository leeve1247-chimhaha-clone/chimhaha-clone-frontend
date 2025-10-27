import {createSlice} from "@reduxjs/toolkit";
import {dropDownReducers} from "./dropDownReducers.tsx";
import {dropDownInitialState} from "./dropDownInitialState.tsx";

export const dropDownSlice = createSlice({
  name: "headerDropDownStatus",
  initialState: dropDownInitialState,
  reducers: dropDownReducers,
});

export const { setHeaderDropDownStatus } = dropDownSlice.actions;
