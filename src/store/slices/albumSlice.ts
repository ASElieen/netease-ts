import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AlbumProps } from "../../application/Album/Album";
import { getAlbumDetailRequest } from "../../api/request";

interface DataProps {
  currentAlbum: AlbumProps;
  isLoading: boolean;
}

const initialState: DataProps = {
  currentAlbum: {
    creator: {
      avatarUrl: "",
      nickname: "",
    },
    coverImgUrl: "",
    subscribedCount: 1,
    name: "",
    tracks: [{ name: "", ar: [{ name: "" }], al: { name: "" } }],
  },
  isLoading: true,
};

export const getCurrentAlbum = createAsyncThunk(
  "album/getCurrentAlbum",
  async (id: string) => {
    try {
      const resp = await getAlbumDetailRequest(id);
      console.log(resp);
      return (resp as any).playlist;
    } catch (error) {
      console.log(error + "请求歌单详情失败");
    }
  }
);

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentAlbum.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentAlbum.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentAlbum = action.payload;
    });
    builder.addCase(getCurrentAlbum.rejected, (state) => {
      state.isLoading = true;
    });
  },
});

export default albumSlice.reducer;
