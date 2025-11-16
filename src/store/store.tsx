import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from '../slices/toggleHeaderSlice'
import pageReducer from '../slices/pageSlice'
import expandReducer from '../slices/expanded'
import recordAudioReducer from '../slices/recordAudio'
import uploadFileReducer from '../slices/uploadFile'
import uploadLinkReducer from '../slices/uploadLink'

export const store = configureStore({
    reducer: {
        toggle: toggleReducer,
        page: pageReducer,
        expand: expandReducer,
        recordAudio: recordAudioReducer,
        uploadFile: uploadFileReducer,
        uploadLink: uploadFileReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
