import type { ThemeReduxProps } from "./ThemeReduxProps.tsx";

export const themeReducers = {
  setTheme: (state: ThemeReduxProps, action: { payload: string }) => {
    state.theme = action.payload;
  }
};
