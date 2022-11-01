import { getBannerRequest } from "../../api/request";
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

interface BannerState {
  bannerImg: Array<{ imageUrl: string }>;
  isLoading: boolean;
  loading: "pending" | "fulfilled" | "rejected";
}


const initialState:BannerState = {
    bannerImg:[],
    isLoading:true,
    loading:'pending'
}

export const getBannerImgs = createAsyncThunk('banner/getBannerImg',async ()=>{
    try {
        const resp = await getBannerRequest()
        return (resp as any).banners
    } catch (error) {
        console.log('轮播图数据传输错误'+error)
    }
})

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(getBannerImgs.pending,(state)=>{
        state.isLoading = true
    });
    builder.addCase(getBannerImgs.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.bannerImg = action.payload;
    });
    builder.addCase(getBannerImgs.rejected,(state)=>{
        state.isLoading = true
        console.log('获取轮播图请求被拒绝')
    })
  }
});

export default bannerSlice.reducer