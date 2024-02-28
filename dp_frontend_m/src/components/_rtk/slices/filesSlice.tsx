import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IProps, IPropsList } from '../../FileEditor/FileEditorTypes'
import backendUrl from '../../../url'

export interface CounterState {
  data: IProps
}

const initialState: IPropsList = {
    data: [{
            id: 1,
            name: 'this_is_testfile1.txt',
            description: 'testfile1',
            owner: '1',
            size: '1',
            created_at: '11.11.1111',
            last_download: '11.11.1111',
            free_file: true
        },
        {
            id: 2,
            name: 'this_is_testfile2.txt',
            description: 'testfile2',
            owner: '2',
            size: '2',
            created_at: '22.22.2222',
            last_download: '22.22.2222',
            free_file: false
        }]
}

export const fetchGet = createAsyncThunk(
    `${backendUrl}api/v1/files/`,
    async () => {
        let token = "Bearer " + String(localStorage.getItem('token'))
        const response = await fetch(`${backendUrl}api/v1/files/`, {headers: {"Authorization": token}})
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