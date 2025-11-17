import { createSlice } from "@reduxjs/toolkit";

type Upload = 'uploaded' | 'isUploading' | null

type File = '.mp3' | '.mp4' | null
type Segment = { start: string; end: string; text: string };
type AudioType = ".mp3" | ".mp4" | ".wav" | ".webm" | ".m4a" | null;
type Audio = {
    icon?: string;
    id: number;
    url: string;
    duration: string;
    filename: string;
    processed: string;
    segments: Segment[];
    audioType: AudioType;
};

const initialState = {
    uploadStatus: null as Upload,
    uploadedFileType: null as File,
    uploadedFile: null as Audio | null,
    simpleText: ''
}

const uploadFileSlice = createSlice({
    name: 'uploadFile',
    initialState,
    reducers: {
        setUploadStatus: (state, action) => { state.uploadStatus = action.payload },
        setFileType: (state, action) => { state.uploadedFileType = action.payload },
        setUploadedFile: (state, action) => { state.uploadedFile = action.payload },
        setSimpleText: (state, action) => { state.simpleText = action.payload }
    }
})

export const { setUploadStatus, setFileType, setUploadedFile, setSimpleText } = uploadFileSlice.actions
export default uploadFileSlice.reducer
