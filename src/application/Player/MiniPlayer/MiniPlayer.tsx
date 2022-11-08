import React, { useRef } from "react";
import { useAppDispatch } from "src/api/customHooks";
import { CSSTransition } from "react-transition-group";
import { MiniPlayerContainer } from "./miniStyle";
import { AiOutlinePause } from "react-icons/ai";
import { BsFillPlayFill, BsMusicNoteList } from "react-icons/bs";
import { getName } from "../../../api/utils";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import CircleProgress from "src/BaseUI/CircleProgress/CircleProgress";


interface SongProps {
  name: any;
  ar: any;
  al: { picUrl: string };
}

export interface ParamProps {
  song: SongProps;
  fullScreen: boolean;
  changeFullScreen: ActionCreatorWithPayload<any, string>;
  playing: boolean;
  clickToControlPlaying: (e:any,state:boolean)=>void;
  percent: number;
  // sequencePlayList: string[];
  // playList: string[];
  // mode: number;
  // currentIndex: number;
  // showPlayList: boolean;
  // currentSong: {};
}

const MiniPlayer: React.FC<ParamProps> = (props) => {
  const { song, changeFullScreen, fullScreen,playing,percent,clickToControlPlaying } = props;
  const dispatch = useAppDispatch()
  const miniPlayerRef = useRef<HTMLDivElement>(null);

  //mock播放进度
  // const percent = 0.2

  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        if (miniPlayerRef.current) miniPlayerRef.current.style.display = "flex";
      }}
      onExited={() => {
        if (miniPlayerRef.current) miniPlayerRef.current.style.display = "none";
      }}
    >
      <MiniPlayerContainer
        ref={miniPlayerRef}
        onClick={() => dispatch(changeFullScreen(true))}
      >
        <div className="icon">
          <div className="imgWrapper">
            <img
              className={`play ${playing ? "" : "pause"}`}
              src={song.al.picUrl}
              width="40"
              height="40"
              alt="img"
            />
          </div>
        </div>

        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>

        <div className="control">
          <CircleProgress radius={32} percent={percent}>
            {playing ? (
              <AiOutlinePause
                className="iconfont icon-mini"
                onClick={(e) => clickToControlPlaying(e, false)}
              />
            ) : (
              <BsFillPlayFill
                className="iconfont icon-mini"
                onClick={(e) => clickToControlPlaying(e, true)}
              />
            )}
          </CircleProgress>
        </div>
        <div className="control">
          <BsMusicNoteList className="iconfont" />
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
};

export default React.memo(MiniPlayer);
