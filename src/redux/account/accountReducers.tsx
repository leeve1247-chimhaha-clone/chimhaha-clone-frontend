import { AccountState } from "./accountSlice.tsx";

export const accountReducers = {
  setNickName: (state: AccountState, action: { payload: string }) => {
    state.nickName = action.payload;
  }
};
