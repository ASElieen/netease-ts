import React from "react";
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
} from "./normalStyle";
import { MdReplay } from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
import { FaRandom } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { BsMusicNoteList, BsFillPlayFill } from "react-icons/bs";
import { ParamProps } from "../MiniPlayer/MiniPlayer";
import { getName } from "src/api/utils";

const NormalPlayer: React.FC<ParamProps> = (props) => {
  const { song } = props;
  return (
    <NormalPlayerContainer>
      <div className="background">
        <img
          src={song.al.picUrl + "?param=300x300"}
          width="100%"
          height="100%"
          alt="歌曲图片"
        />
      </div>
      <div className="background layer"></div>

      <Top className="top">
        <div className="back">
          <IoMdArrowBack className="iconfont" />
        </div>
        <h1 className="title">{song.name}</h1>
        <h1 className="subtitle">{getName(song.ar)}</h1>
      </Top>

      <Middle>
        <CDWrapper>
          <div className="cd">
            <img
              className="image play"
              src={song.al.picUrl + "?param=400x400"}
              alt=""
            />
          </div>
        </CDWrapper>
      </Middle>

      <Bottom className="bottom">
        <Operators>
          <div className="icon i-left">
            <BiRefresh className="iconfont" />
          </div>

          <div className="icon i-left">
            <IoPlaySkipBack className="iconfont" />
          </div>

          <div className="icon i-center">
            <BsFillPlayFill className="iconfont" />
          </div>

          <div className="icon i-right">
            <IoPlaySkipForward className="iconfont" />
          </div>

          <div className="icon i-right">
            <BsMusicNoteList className="iconfont" />
          </div>
        </Operators>
      </Bottom>
    </NormalPlayerContainer>
  );
};

export default React.memo(NormalPlayer);
