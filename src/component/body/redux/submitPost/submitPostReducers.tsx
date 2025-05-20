import type { PayloadAction } from "@reduxjs/toolkit";

import type { SubmitPostStateProps } from "./SubmitPostStateProps.tsx";
import type { SerializedEditorState } from "lexical";

export const submitPostReducers = {
  setTitle: (state: SubmitPostStateProps, action: PayloadAction<string>) => {
    state.title = action.payload;
  },
  setContent: (state: SubmitPostStateProps, action: PayloadAction<SerializedEditorState>) => {
    state.content = action.payload;
  },
  setCategory: (state: SubmitPostStateProps, action: PayloadAction<string>) => {
    state.category = action.payload;
  },

  startSubmitPost: (state: SubmitPostStateProps) => {
    state.run = true;
  },
  stopSubmitPost: (state: SubmitPostStateProps) => {
    state.run = false;
  }
};
