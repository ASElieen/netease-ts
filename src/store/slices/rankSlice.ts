import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { getRankListRequest } from '../../api/request'

export type ParamProps = {
  tracks: Array<{ first: string; second: string }>;
  coverImgId: number;
  coverImgUrl: string;
  updateFrequency:string
};

interface rankProps {
    rankList:Array<ParamProps>,
    isLoading:boolean
}

const initialState:rankProps = {
    rankList:[],
    isLoading:true
}

export const getRankList = createAsyncThunk('list/getRankList',async (_,thunkAPI)=>{
    try {
        const resp = await getRankListRequest()
        return (resp as any).list
    } catch (error) {
        console.log(thunkAPI.rejectWithValue(error)+'获取排行榜单列表失败')
    }
})

const rankSlice = createSlice({
    name:'rank',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getRankList.pending,(state)=>{
            state.isLoading = true
        });
        builder.addCase(getRankList.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.rankList = action.payload
        });
        builder.addCase(getRankList.rejected,(state)=>{
            state.isLoading = true
            console.log('Reducer请求排行列表失败')
        })
    }
})

export default rankSlice.reducer
