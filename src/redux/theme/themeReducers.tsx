import type { ThemeState } from "./themeSlice.tsx";

export const themeReducers = {
  setTheme: (state: ThemeState, action: { payload: string }) => {
    state.theme = action.payload;
  }
};
