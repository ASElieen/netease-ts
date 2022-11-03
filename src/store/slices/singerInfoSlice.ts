import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SongsProp } from "../../application/SongList/SongList";
import {getSingerInfoRequest} from '../../api/request'


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
      const resp = await getSingerInfoRequest(id);
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
