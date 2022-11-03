import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import AlbumHeader from "../../components/AlbumHeader/AlbumHeader";
import SongList from "../SongList/SongList";
import Scroll from "../../components/Scroll/Scroll";
import {
  Container,
  CollectButton,
  ImgWrapper,
  SongListWrapper,
  BgLayer,
} from "./singerInfoStyle";
import { BiCollection } from "react-icons/bi";
import { artist } from "../../api/mock";

const SingerInfo = () => {
  const [showStatus, setShowStatus] = useState(true);
  const navigate = useNavigate();

  //ref部分
  const collectButton = useRef<HTMLDivElement>(null);
  const imageWrapper = useRef<HTMLDivElement>(null);
  const songScrollWrapper = useRef<HTMLDivElement>(null);
  const songScroll = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  // 图片初始高度
  const initialHeight = useRef(0);

  // 往上偏移的尺寸，露出圆角
  const OFFSET = -5;

  useEffect(() => {
    let h;
    if (imageWrapper.current) h = imageWrapper.current.offsetHeight;

    if (songScrollWrapper.current)
      songScrollWrapper.current.style.top = `${h as number - OFFSET}px`;

    if (initialHeight.current) initialHeight.current = h as number;

    if (layer.current) layer.current.style.top = `${(h as number) - OFFSET} px`;

    //useImperativeHandle让这里可以调用Scroll中的refresh
    if (songScroll.current) (songScroll.current as any).refresh();
  },[]);

  //开始加载退出动画
  const handleExit = useCallback(() => {
    setShowStatus(false);
  }, []);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <Container play={-1}>
        <AlbumHeader title="头部" handleClick={handleExit} ref={header} />
        <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
          <div className="filter"></div>
        </ImgWrapper>

        <CollectButton ref={collectButton}>
          <BiCollection className="iconfont" />
          <span className="text">收藏</span>
        </CollectButton>

        {/* <BgLayer ref={layer} /> */}

        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll}>
            <SongList songs={artist.hotSongs} showCollect={false} />
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  );
};

export default React.memo(SingerInfo);
