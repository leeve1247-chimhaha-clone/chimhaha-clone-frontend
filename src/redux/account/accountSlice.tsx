import {createSlice} from "@reduxjs/toolkit";
import {accountInitialState} from "./accountInitialState.tsx";
import {accountReducers} from "./accountReducers.tsx";

export const accountSlice = createSlice({
  name: "account",
  initialState: accountInitialState,
  reducers: accountReducers,
});

// Action creators are generated for each case reducer function
export const { setNickName } = accountSlice.actions;
