import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import backendUrl from '../../../url'

export interface UserState {
    username: string
    email: string
    id: number
    full_name: string
    is_staff?: boolean
}

const initialState: UserState = {
    username: '',
    email: '',
    id: 0,
    full_name: ''
}

export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async (userId: number) => {
      const token = "Bearer " + String(localStorage.getItem('token'))
      const response = await fetch(`${backendUrl}api/v1/users/${userId}`, { headers: { "Authorization": token } })
      return response.json()
    }
  )

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.username = action.payload.username
        state.email = action.payload.email
        state.id = action.payload.id
        state.full_name = action.payload.full_name
        state.is_staff = action.payload.is_staff
      })
  }
})

export default userSlice.reducer