import {configureStore} from '@reduxjs/toolkit'
import bannerReducer from './slices/bannerSlice'
import recommendReducer from './slices/recommendListSlice'
import hotSingerReducer from './slices/singerListSlice'
import rankReducer from './slices/rankSlice'
import albumReducer from './slices/albumSlice'

const store = configureStore({
    reducer:{
        banner:bannerReducer,
        recommend:recommendReducer,
        hotSinger:hotSingerReducer,
        rank:rankReducer,
        album:albumReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store
