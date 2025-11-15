import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from '../slices/toggleHeaderSlice'
import pageReducer from '../slices/pageSlice'
import expandReducer from '../slices/expanded'

export const store = configureStore({
    reducer: {
        toggle: toggleReducer,
        page: pageReducer,
        expand: expandReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
