import type {PayloadAction} from "@reduxjs/toolkit";
import type {DefaultPostDetailReduxProps} from "./DefaultPostDetailReduxProps.tsx";
import {defaultPostDetailInitialState} from "./defaultPostDetailInitialState.tsx";

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
  initProps: (state: DefaultPostDetailReduxProps) => {
    Object.assign(state, defaultPostDetailInitialState);
  }
};
