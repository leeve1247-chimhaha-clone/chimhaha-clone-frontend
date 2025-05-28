import { configureStore } from "@reduxjs/toolkit";
import { dropDownSlice } from "./dropDown/dropDownSlice.tsx";
import { accountSlice } from "./account/accountSlice.tsx";
import { defaultPostDetailSlice } from "./post/detail/defaultPostDetailSlice.tsx";


export const store = configureStore({
  reducer: {
    headerDropDownStatus: dropDownSlice.reducer,
    accountStatus: accountSlice.reducer,
    defaultPostDetailStatus: defaultPostDetailSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
