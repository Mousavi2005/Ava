import { createSlice } from "@reduxjs/toolkit";

type Pages = 'transcribe' | 'archive'

const initialState = {
    activePage: 'transcribe' as Pages
}

const pageSlice = createSlice({
    name: "activePage",
    initialState,
    reducers: {
        setActivePage: (state, action) => { state.activePage = action.payload }
    }

})

export const { setActivePage } = pageSlice.actions
export default pageSlice.reducer
