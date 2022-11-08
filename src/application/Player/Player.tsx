import React,{useState,useRef, useEffect} from "react";
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
import { getSongUrl,isEmptyObject } from "src/api/utils";
import MiniPlayer from "./MiniPlayer/MiniPlayer";
import NormalPlayer from "./NormalPlayer/NormalPlayer";
//mock
import { playList } from "src/api/mock";


const Player = () => {
  const dispatch = useAppDispatch()
  const { fullScreen,playing,currentIndex,currentSong } = useAppSelector((state) => state.player);

  //目前播放时间
  const [currentTime,setCurrentTime] = useState(0)
  //歌曲总时长
  const [duration,setDuration] = useState(0)
  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  //ref
  const audioRef = useRef<HTMLAudioElement>(null)

  //控制是否播放
  const clickToControlPlaying = (e:any,state:boolean)=>{
    //阻止事件传播
    e.stopPropagation();
    dispatch(togglePlayingState(state))
  }

  useEffect(()=>{
    if(!currentSong) return
    dispatch(changeCurrentIndex(0))
    let current = playList[0]
    dispatch(changeCurrentSong(current));
    (audioRef.current as HTMLAudioElement).src = getSongUrl(current.id)
    setTimeout(()=>{
      (audioRef.current as HTMLAudioElement).play()
    })
    dispatch(togglePlayingState(true))
    setCurrentTime(0) //从头播放
    setDuration((current.dt/1000 | 0)) //时长
  },[])

  // const currentSong = {
    // al: {
    //   picUrl:
    //     "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg",
    // },
    // name: "木偶人",
    // ar: [{ name: "薛之谦" }],
  // };

  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <MiniPlayer
          song={currentSong}
          fullScreen={fullScreen}
          changeFullScreen={changeFullScreen}
          playing={playing}
          percent={percent}
          clickToControlPlaying={clickToControlPlaying}
        />
      )}
      {isEmptyObject(currentSong) ? null : (
        <NormalPlayer
          song={currentSong}
          fullScreen={fullScreen}
          changeFullScreen={changeFullScreen}
          playing={playing}
          percent={percent}
          clickToControlPlaying={clickToControlPlaying}
        />
      )}
      <audio ref={audioRef}></audio>
    </div>
  );
};

export default React.memo(Player);
