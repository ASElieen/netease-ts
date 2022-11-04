import React from 'react'
import { MiniPlayerContainer } from './miniStyle'
import { AiOutlinePause } from "react-icons/ai";
import { BsFillPlayFill, BsMusicNoteList } from "react-icons/bs";
import {getName} from '../../../api/utils'

interface SongProps {
    name:any,
    ar:any,
    al:{picUrl:string}
}

interface ParamProps {
    song:SongProps
}

const MiniPlayer:React.FC<ParamProps> = (props) => {
    const {song} = props
  return (
    <MiniPlayerContainer>
      <div className="icon">
        <div className="imgWrapper">
          <img
            className="play"
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
        <AiOutlinePause className="iconfont iconfont-mini" />
      </div>
      <div className="control">
        <BsMusicNoteList className="iconfont iconfont-mini" />
      </div>
    </MiniPlayerContainer>
  );
}

export default React.memo(MiniPlayer);