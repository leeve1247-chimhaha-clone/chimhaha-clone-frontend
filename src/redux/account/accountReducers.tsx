import type {AccountReduxProps} from "./accountReduxProps.tsx";

export const accountReducers = {
  setNickName: (state: AccountReduxProps, action: { payload: string }) => {
    state.nickName = action.payload;
  }
};
