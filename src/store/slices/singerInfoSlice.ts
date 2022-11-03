import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SongsProp } from "../../application/SongList/SongList";
import { axiosInstance } from "../../api/config";
//import不能导入
// const { getSingerDetailRequest } = require("../../api/request");

//import 这个函数不知道为什么识别不了 只能暂时先写在这
const getSingerDetailRequest = (id: string) => {
  return axiosInstance.get(`/artists?id=${id}`);
};

interface ParamsProps {
  singerInfo: SongsProp;
  isLoading: boolean;
}

const initialState: ParamsProps = {
  singerInfo: {
    id: 1,
    name: "",
    hotSongs: [],
    artist: { name: "",picUrl:'' },
    ar: [],
    al: { name: "" },
  },
  isLoading: true,
};

export const getSingerInfo = createAsyncThunk(
  "info/getSingerInfo",
  async (id: string) => {
    try {
      const resp = await getSingerDetailRequest(id);
      return (resp as any);
    } catch (error) {
      console.log(error + "请求歌手信息失败");
    }
  }
);

const singerInfoSlice = createSlice({
  name: "singerInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingerInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingerInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singerInfo = action.payload;
    });
    builder.addCase(getSingerInfo.rejected, (state) => {
      state.isLoading = true;
    });
  },
});

export default singerInfoSlice.reducer;
