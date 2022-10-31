import {configureStore} from '@reduxjs/toolkit'
import bannerReducer from './slices/bannerSlice'
import recommendReducer from './slices/recommendListSlice'
import hotSingerReducer from './slices/singerListSlice'

const store = configureStore({
    reducer:{
        banner:bannerReducer,
        recommend:recommendReducer,
        hotSinger:hotSingerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store
