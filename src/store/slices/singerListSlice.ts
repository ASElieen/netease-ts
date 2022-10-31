import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { getHotSingerListRequest,getSingerListRequest } from '../../api/request'
import {Singers} from '../../components/RenderSingerList/RenderSingerList'
import {RootState} from '../store'

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

//初次加载获取热门歌手
export const getHotSingerList = createAsyncThunk(
  "list/getHotSingerlist",
  async (_,{ rejectWithValue }) => {
    try {
      const resp = await getHotSingerListRequest(initialState.pageCount);
      return (resp as any).artists;
    } catch (error) {
      console.log(rejectWithValue(error)+ "获取热门歌手失败");
    }
  }
);

//下拉加载更多热门歌手
export const requestMoreHotSingers = createAsyncThunk('list/getMoreHotSingers', async (_,{getState,rejectWithValue})=>{
    const {pageCount} = (getState() as RootState).hotSinger;
    try {
        const resp = await getHotSingerListRequest(pageCount)
        return (resp as any).artists
    } catch (error) {
        console.log(rejectWithValue(error)+'刷新热门歌手失败')
    }
})

//获取对应顶端导航栏分类的歌手列表
export const getSingerListWithCategory = createAsyncThunk('list/getSingerlistWithCategory',async (data:ParamProps)=>{
    const {categoryName,alpha,area} = data
    try {
        const resp = await getSingerListRequest(categoryName,alpha,area)
        return (resp as any).artists
    } catch (error) {
        console.log(error+'获取歌手分类列表失败')
    }
})

//加载对应导航栏的更多歌手
export const refreshMoreSingersWithCategory = createAsyncThunk(
  "list/getMoreSingersWithCategory",
  async (data: ParamProps, { getState, rejectWithValue }) => {
    const { categoryName, alpha, area } = data;
    const { pageCount } = (getState() as RootState).hotSinger;
    try {
      const resp = await getSingerListRequest(categoryName, alpha, pageCount,area);
      return (resp as any).artists;
    } catch (error) {
        console.log(rejectWithValue(error)+'加载更多当前分类歌手失败')
    }
  }
);


const hotSingerSlice = createSlice({
  name: "hotSinger",
  initialState,
  reducers: {
    addPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    clearPageCount: (state) => {
      state.pageCount = 0;
    },
    changePullUpLoading: (state, action) => {
      state.pullUpLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    //初次加载歌手页获取热门列表
    builder.addCase(getHotSingerList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getHotSingerList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singerList = action.payload;
    });
    builder.addCase(getHotSingerList.rejected, (state) => {
      state.isLoading = true;
      console.log("首次获取歌手列表失败");
    });

    //加载对应顶部导航栏的分类列表
    builder.addCase(getSingerListWithCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingerListWithCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singerList = action.payload;
    });
    builder.addCase(getSingerListWithCategory.rejected, (state) => {
      state.isLoading = true;
      console.log("获取特定歌手信息被拒绝");
    });

    //下拉加载更多热门歌手
    builder.addCase(requestMoreHotSingers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(requestMoreHotSingers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singerList = action.payload;
    });
    builder.addCase(requestMoreHotSingers.rejected, (state) => {
      state.isLoading = true;
      console.log("加载更多热门歌手信息被拒绝");
    });

    //下拉加载更多当前分类歌手
    builder.addCase(refreshMoreSingersWithCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(refreshMoreSingersWithCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singerList = action.payload;
    });
    builder.addCase(refreshMoreSingersWithCategory.rejected, (state) => {
      state.isLoading = true;
      console.log("加载更多当前分类歌手信息被拒绝");
    });
  },
});



export const { addPageCount, clearPageCount, changePullUpLoading } =
  hotSingerSlice.actions;
export default hotSingerSlice.reducer

