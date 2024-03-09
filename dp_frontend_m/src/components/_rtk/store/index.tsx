import { configureStore } from '@reduxjs/toolkit'
import fileSlice from '../slices/filesSlice'
import userSlice from '../slices/userSlice'
import usersListSlice from '../slices/usersListSlice'

export const store = configureStore({
    reducer: {
      files: fileSlice,
      user: userSlice,
      usersList: usersListSlice
    },
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch