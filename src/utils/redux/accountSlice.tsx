import { createSlice } from '@reduxjs/toolkit'

export interface AccountState {
  // token: string // 보안 이슈로 따로 처리
  nickName: string
}

const initialState: AccountState = {
  // token : "",
  nickName : ""
}

const reducers = {
  // setToken: (state: AccountState, action: { payload: string }) => {
  //   state.token = action.payload
  // },
  setNickName: (state: AccountState, action: { payload: string }) => {
    state.nickName = action.payload
  },
}

export const accountSlice = createSlice({
  name: 'account',
  initialState : initialState,
  reducers: reducers
})

// Action creators are generated for each case reducer function
export const { setNickName } = accountSlice.actions;