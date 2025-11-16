import { createSlice } from "@reduxjs/toolkit";

type Upload = 'uploaded' | 'isUploading' | null

const initialState = {
    uploadStatus: null as Upload,
}

const uploadLinkSlice = createSlice({
    name: 'uploadLink',
    initialState,
    reducers: {
        setUploadStatus: (state, action) => { state.uploadStatus = action.payload },
    }
})

export const { setUploadStatus } = uploadLinkSlice.actions
export default uploadLinkSlice.reducer
