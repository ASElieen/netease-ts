import React from 'react'
import {
  changeFullScreen,
  togglePlayingState,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changeMode,
  changeShowPlayList,
} from "../../store/slices/playerSlice";
import MiniPlayer from './MiniPlayer/MiniPlayer';

const Player = () => {
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
        <MiniPlayer song={currentSong}/>
    </div>
  )
}

export default React.memo(Player);