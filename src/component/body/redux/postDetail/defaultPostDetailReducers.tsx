import type { PayloadAction } from "@reduxjs/toolkit";
import type { DefaultPostDetailReduxProps } from "./DefaultPostDetailReduxProps.tsx";

export const defaultPostDetailReducers = {
  setLikes: (
    state: DefaultPostDetailReduxProps,
    action: PayloadAction<{
      likes: number;
      selfLiked: boolean;
    }>,
  ) => {
    state.likes = {
      likes: action.payload.likes,
      selfLiked: action.payload.selfLiked,
    };
  },
};
