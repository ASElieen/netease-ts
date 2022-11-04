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

const Player = () => {
  return (
    <div>Player</div>
  )
}

export default React.memo(Player);