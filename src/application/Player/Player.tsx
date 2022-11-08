import React from "react";
import {
  changeFullScreen,
  togglePlayingState,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changeMode,
  changeShowPlayList,
} from "../../store/slices/playerSlice";
import { useAppSelector,useAppDispatch } from "src/api/customHooks";
import MiniPlayer from "./MiniPlayer/MiniPlayer";
import NormalPlayer from "./NormalPlayer/NormalPlayer";
import { useDispatch } from "react-redux";

const Player = () => {
  const dispatch = useDispatch()
  const { fullScreen,playing,percent } = useAppSelector((state) => state.player);

  //控制是否播放
  const clickToControlPlaying = (e:any,state:boolean)=>{
    //阻止事件传播
    e.stopPropagation();
    dispatch(togglePlayingState(state))
  }

  const currentSong = {
    al: {
      picUrl:
        "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg",
    },
    name: "木偶人",
    ar: [{ name: "薛之谦" }],
  };
  return (
    <div>
      <MiniPlayer
        song={currentSong}
        fullScreen={fullScreen}
        changeFullScreen={changeFullScreen}
        playing={playing}
        percent={percent}
        clickToControlPlaying={clickToControlPlaying}
      />
      <NormalPlayer
        song={currentSong}
        fullScreen={fullScreen}
        changeFullScreen={changeFullScreen}
        playing={playing}
        percent={percent}
        clickToControlPlaying={clickToControlPlaying}
      />
    </div>
  );
};

export default React.memo(Player);
