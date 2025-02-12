import { configureStore } from "@reduxjs/toolkit";
import { dropDownSlice } from "./dropDownSlice.tsx";


export const store = configureStore({
  reducer: {
    headerDropDownStatus: dropDownSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
