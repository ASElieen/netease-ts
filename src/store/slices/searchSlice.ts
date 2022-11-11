import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {
  getHotKeyWordsRequest,
  getSuggestListRequest,
  getResultSongsListRequest,
} from "../../api/request";

interface SearchParamProps {
    hotList:any, //热门关键词列表
    suggestList:any, // 列表 包括歌单和歌手
    songsList:any, //歌曲列表
    enterLoading:boolean,
    isLoading:boolean
}

const initialState:SearchParamProps = {
    hotList:[],
    suggestList:[],
    songsList:[],
    enterLoading:false,
    isLoading:true
}

export const getHotKeyWords = createAsyncThunk('keywords/getKeywords',async ()=>{
    try {
        const resp = await getHotKeyWordsRequest();
        return (resp as any).result.hots;
    } catch (error) {
        console.log('请求热门搜索词失败'+error)
    }
})

export const getSuggestList = createAsyncThunk('list/getSuggestList',async (query:string)=>{
    try {
        const resp = await getSuggestListRequest(query)
        return (resp as any).albums
    } catch (error) {
        console.log('请求搜索推荐列表失败'+error)
    }
})

export const getResultSongList = createAsyncThunk('list/getResultList',async (query:string)=>{
    try {
        const resp = await getResultSongsListRequest(query)
        return (resp as any).songs
    } catch (error) {
        console.log('请求搜索结果列表失败'+error)
    }
})

const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        //热门关键词
        builder.addCase(getHotKeyWords.pending,(state)=>{
            state.isLoading = true
        });
        builder.addCase(getHotKeyWords.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.hotList = action.payload
        });
        builder.addCase(getHotKeyWords.rejected,(state)=>{
            state.isLoading = true
        });

        //suggest
        builder.addCase(getSuggestList.pending,(state)=>{
            state.isLoading = true
        });
        builder.addCase(getSuggestList.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.suggestList = action.payload
        });
        builder.addCase(getSuggestList.rejected,(state)=>{
            state.isLoading = true
        })

        //resultList
        builder.addCase(getResultSongList.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getResultSongList.fulfilled, (state, action) => {
          state.isLoading = false;
          state.songsList = action.payload;
        });
        builder.addCase(getResultSongList.rejected, (state) => {
          state.isLoading = true;
        });
    }
})

export default searchSlice.reducer