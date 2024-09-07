import { createSlice, configureStore } from '@reduxjs/toolkit'

export interface StateProps {
  token: string
  nickName: string
}
const initialState : StateProps = {
  token : "",
  nickName : ""
}
const reducers = {
  setToken: (state: StateProps, action: { payload: string }) => {
    state.token = action.payload
  },
  setNickName: (state: StateProps, action: { payload: string }) => {
    state.nickName = action.payload
  },
}

const stateSlice = createSlice({
  name: 'token',
  initialState,
  reducers
})

export const store = configureStore({
  reducer: stateSlice.reducer
})
export const { setToken, setNickName } = stateSlice.actions