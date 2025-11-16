import { createSlice } from "@reduxjs/toolkit";

type Upload = 'uploaded' | 'isUploading' | null

type File = '.mp3' | '.mp4' | null

const initialState = {
    uploadStatus: null as Upload,
    uploadedFileType: null as File
}

const uploadFileSlice = createSlice({
    name: 'uploadFile',
    initialState,
    reducers: {
        setUploadStatus: (state, action) => { state.uploadStatus = action.payload },
        setFileType: (state, action) => { state.uploadedFileType = action.payload }
    }
})

export const { setUploadStatus, setFileType } = uploadFileSlice.actions
export default uploadFileSlice.reducer
