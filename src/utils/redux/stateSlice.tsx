import { createSlice } from '@reduxjs/toolkit'

export interface LoginState {
  token: string
  nickName: string
}

const initialState: LoginState = {
  token : "",
  nickName : ""
}

const reducers = {
  setToken: (state: LoginState, action: { payload: string }) => {
    state.token = action.payload
  },
  setNickName: (state: LoginState, action: { payload: string }) => {
    state.nickName = action.payload
  },
}

export const stateSlice = createSlice({
  name: 'token',
  initialState : initialState,
  reducers: reducers
})

// Action creators are generated for each case reducer function
export const { setToken, setNickName } = stateSlice.actions