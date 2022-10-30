import {configureStore} from '@reduxjs/toolkit'
import bannerReducer from './slices/bannerSlice'

const store = configureStore({
    reducer:{
        banner:bannerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store
