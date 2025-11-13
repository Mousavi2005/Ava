import { createSlice } from "@reduxjs/toolkit";

type Mode = {
    active: 'mic' | 'upload' | 'link' | null
}

const initialState:Mode = {
    active: 'mic'
}

const toggleSlice = createSlice({
    name: 'toggleHeader',
    initialState,
    reducers: {
        activateMic: (state) => {state.active = 'mic'},
        activateUpload: (state) => {state.active = 'upload'},
        activateLink: (state) => {state.active = 'link'}

    }
})

export const {activateMic, activateUpload, activateLink} = toggleSlice.actions
export default toggleSlice.reducer
