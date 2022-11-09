import React, { useState, useRef, useEffect } from "react";
import {
  changeFullScreen,
  togglePlayingState,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changeMode,
  changeShowPlayList,
} from "../../store/slices/playerSlice";
import { useAppSelector, useAppDispatch } from "src/api/customHooks";
import { getSongUrl, isEmptyObject } from "src/api/utils";
import MiniPlayer from "./MiniPlayer/MiniPlayer";
import NormalPlayer from "./NormalPlayer/NormalPlayer";
//mock
import { playList } from "src/api/mock";

const Player = () => {
  const dispatch = useAppDispatch();
  const { fullScreen, playing, currentIndex, currentSong } = useAppSelector(
    (state) => state.player
  );

  //记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
  const [presong, setPresong] = useState({});
  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration, setDuration] = useState(0);
  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  //ref
  const audioRef = useRef<HTMLAudioElement>(null);

  //控制是否播放
  const clickToControlPlaying = (e: any, state: boolean) => {
    //阻止事件传播
    e.stopPropagation();
    dispatch(togglePlayingState(state));
  };

  //控制歌曲播放逻辑
  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === (presong as any).id
    )
      return;

    let current = playList[currentIndex];
    dispatch(changeCurrentSong(current)); //给currentSong赋值
    setPresong(current);
    (audioRef.current as HTMLAudioElement).src = getSongUrl(current.id);
    setTimeout(() => {
      (audioRef.current as HTMLAudioElement).play();
    });

    dispatch(togglePlayingState(true)); //播放状态
    setCurrentTime(0); //从头播放
    setDuration((current.dt / 1000) | 0); //时长
  }, [currentIndex, dispatch, presong]);

  //mini播放器的播放和暂停
  useEffect(() => {
    playing
      ? (audioRef.current as HTMLAudioElement).play()
      : (audioRef.current as HTMLAudioElement).pause();
  }, [playing]);

  //mock的currentIndex
  useEffect(() => {
    dispatch(changeCurrentIndex(0));
  }, [dispatch]);

  //伴随onTimeUpdate更新currentTime
  const updateTime = (e: any) => {
    setCurrentTime(e.target.currentTime);
  };

  //控制条状进度条进度
  const onProgressChange = (curPercent: number) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    (audioRef.current as HTMLAudioElement).currentTime = newTime;
    if (!playing) {
      dispatch(togglePlayingState(true));
    }
  };

  //--------------------------上下曲切换逻辑-------------------------
  //playList里只有一首歌时单曲循环
  const handleLoop = () => {
    (audioRef.current as HTMLAudioElement).currentTime = 0;
    dispatch(togglePlayingState(true));
    (audioRef.current as HTMLAudioElement).play();
  };

  //前一首
  const handlePrev = () => {
    //只有一首的话单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) dispatch(togglePlayingState(true));
    dispatch(changeCurrentIndex(index));
  };

  //下一首
  const handleNext = () => {
    //播放列表一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) dispatch(togglePlayingState(true));
    dispatch(changeCurrentIndex(index));
  };

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
          duration={duration}
          currentTime={currentTime}
          onProgressChange={onProgressChange}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      )}
      <audio ref={audioRef} onTimeUpdate={updateTime}></audio>
    </div>
  );
};

export default React.memo(Player);
