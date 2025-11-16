import { createSlice } from "@reduxjs/toolkit";

type Recording = 'recorded' | 'idRecording' | null

const initialState = {
    recordStatus: 'null' as Recording
}

const recordAudioSlice = createSlice({
    name: "recordSlice",
    initialState,
    reducers: {
        setRecordStatus: ((state, action) => { state.recordStatus = action.payload })
    }
})

export const { setRecordStatus } = recordAudioSlice.actions
export default recordAudioSlice.reducer
