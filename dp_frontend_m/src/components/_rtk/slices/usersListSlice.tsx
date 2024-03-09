import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import backendUrl from '../../../url'
import { UserState } from './userSlice'

export interface UsersListState {
    users: UserState[]
}

const initialState: UsersListState = {
    users: []
}

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const token = "Bearer " + String(localStorage.getItem('token'))
        const response = await fetch(`${backendUrl}api/v1/users/`, { headers: { "Authorization": token } })
        return response.json()
    }
)

export const usersListSlice = createSlice({
    name: "usersList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
    }
})

export default usersListSlice.reducer