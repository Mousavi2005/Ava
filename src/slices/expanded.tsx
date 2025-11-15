import { createSlice } from "@reduxjs/toolkit"

type Sections = 'simple' | 'timed'

const initialState = {
    activeSection: 'simple' as Sections
}

const expand = createSlice({
    name: "expand",
    initialState,
    reducers: {
        setActiveSection: (state, action) => { state.activeSection = action.payload }
    }
})

export const { setActiveSection } = expand.actions
export default expand.reducer
