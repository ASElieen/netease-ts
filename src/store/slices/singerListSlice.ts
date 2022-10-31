import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { getHotSingerListRequest,getSingerListRequest } from '../../api/request'
import {Singers} from '../../components/RenderSingerList/RenderSingerList'

interface SingerState {
  singerList: Array<Singers>;
  isLoading: boolean;
  pullDownLoading: boolean;
  pullUpLoading: boolean;
  pageCount: number;
}

interface ParamProps {
    categoryName:string,
    alpha:string,
    area:number,
    count?:number
}

//上拉加载相当于重新获取一遍 下拉加载通过pageCount添加分页数
const initialState:SingerState = {
    singerList:[],
    isLoading:true,
    pullDownLoading:false,
    pullUpLoading:false,
    pageCount:0
}

//初次加载获取
export const getHotSingerList = createAsyncThunk('list/getHotSingerlist', async ()=>{
    try {
        const resp = await getHotSingerListRequest(initialState.pageCount)
        return (resp as any).artists
    } catch (error) {
        console.log(error+'获取热门歌手失败')
    }
})

//分类歌手列表
export const getSingerListWithCategory = createAsyncThunk('list/getSingerlistWithCategory',async (data:ParamProps)=>{
    const {categoryName,alpha,area} = data
    try {
        const resp = await getSingerListRequest(categoryName,alpha,area)
        return (resp as any).artists
    } catch (error) {
        console.log(error+'获取歌手分类列表失败')
    }
})

const hotSingerSlice = createSlice({
    name:'hotSinger',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getHotSingerList.pending,(state)=>{
            state.isLoading = true
        });
        builder.addCase(getHotSingerList.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.singerList = action.payload
        });
        builder.addCase(getHotSingerList.rejected,(state)=>{
            state.isLoading = true
            console.log('首次获取歌手列表失败')
        })

        builder.addCase(getSingerListWithCategory.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(getSingerListWithCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.singerList =action.payload
        })
        builder.addCase(getSingerListWithCategory.rejected,(state)=>{
            state.isLoading = true
            console.log('获取特定歌手信息被拒绝')
        })
    }
})

export default hotSingerSlice.reducer

