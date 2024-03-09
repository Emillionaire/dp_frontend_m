import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IProps, IPropsList } from '../../FileEditor/FileEditorTypes'
import backendUrl from '../../../url'

export interface CounterState {
  data: IProps
}

const initialState: IPropsList = {
  data: []
}

export const fetchGet = createAsyncThunk(
  `${backendUrl}api/v1/files/`,
  async () => {
    const token = "Bearer " + String(localStorage.getItem('token'))
    const response = await fetch(`${backendUrl}api/v1/files/`, { headers: { "Authorization": token } })
    return response.json()
  }
)

export const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGet.fulfilled, (state, action) => {
        state.data = action.payload
      })
  }
})

export default fileSlice.reducer