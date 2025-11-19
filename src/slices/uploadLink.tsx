import { createSlice } from "@reduxjs/toolkit";

type Upload = 'uploaded' | 'isUploading' | null
type Url = string

const initialState = {
    uploadStatus: null as Upload,
    url: "" as Url
}

const uploadLinkSlice = createSlice({
    name: 'uploadLink',
    initialState,
    reducers: {
        setLinkStatus: (state, action) => { state.uploadStatus = action.payload },
        setUrl: (state, action) => { state.url = action.payload }
    }
})

export const { setLinkStatus, setUrl } = uploadLinkSlice.actions
export default uploadLinkSlice.reducer
