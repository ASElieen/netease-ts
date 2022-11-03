import React, { useState,useCallback } from "react";
import {useNavigate} from 'react-router-dom'
import { CSSTransition } from "react-transition-group";
import AlbumHeader from "../../components/AlbumHeader/AlbumHeader";
import SongList from "../SongList/SongList";
import Scroll from "../../components/Scroll/Scroll";
import {Container,CollectButton,ImgWrapper,SongListWrapper,BgLayer} from './singerInfoStyle'
import {BiCollection} from 'react-icons/bi'
import { artist } from "../../api/mock";

const SingerInfo = () => {
  const [showStatus, setShowStatus] = useState(true);
  const navigate = useNavigate()

  //开始加载退出动画
  const handleExit = useCallback(() => {
    setShowStatus(false);
  },[]);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <Container play={1}>
        <AlbumHeader title="头部" handleClick={handleExit} />
        <ImgWrapper bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>

        <CollectButton>
          <BiCollection className="iconfont" />
          <span className="text">收藏</span>
        </CollectButton>

        {/* <BgLayer /> */}

        <SongListWrapper>
          <Scroll>
            <SongList songs={artist.hotSongs} showCollect={false}/>
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  );
};

export default React.memo(SingerInfo);
