import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRecommendListRequest } from "../../api/request";
import {RecommendData} from '../../components/RecommendList/RecommendList'

interface RecommendState {
  recommendList: Array<RecommendData>;
  isLoading: boolean;
  loading: "pending" | "fulfilled" | "rejected";
}

const initialState:RecommendState = {
    recommendList:[],
    isLoading:true,
    loading:'pending'
}

export const getRecommendList = createAsyncThunk('recommend/getRecommendList',async ()=>{
    try {
        const resp = await getRecommendListRequest()
        return (resp as any).result
    } catch (error) {
        console.log(error)
    }
})

const recommendSlice = createSlice({
    name:'recommendList',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getRecommendList.pending,(state)=>{
            state.isLoading = true
        });
        builder.addCase(getRecommendList.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.recommendList = action.payload
        });
        builder.addCase(getRecommendList.rejected,(state)=>{
            state.isLoading = true
            console.log('获取推荐列表被拒绝')
        })
    }
})

export default recommendSlice.reducer
