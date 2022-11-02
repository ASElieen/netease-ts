import React, { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container,TopDesc,Menu,SongList,SongItem } from "./albumStyle";
import { CSSTransition } from "react-transition-group";
import AlbumHeader from "../../components/AlbumHeader/AlbumHeader";
import { currentAlbum } from "../../api/mock";
import Scroll,{PosType} from "../../components/Scroll/Scroll";
import { BsFillPlayFill } from "react-icons/bs";
import { BiComment, BiLike } from "react-icons/bi";
import { MdCollections } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { getName,getCount } from "../../api/utils";
import commonStyle from "../../assets/globalStyle";

export type AlbumTracksProps = {
  name: "string";
  ar: Array<{ name: string }>;
  al:{name:string}
};

interface AlbumProps {
  creator: {
    avatarUrl: string;
    nickname: string;
  };
  coverImgUrl: string;
  subscribedCount: number;
  name: string;
  tracks: Array<AlbumTracksProps>;
}

const Album:React.FC<AlbumProps> = (props) => {
  const navigate = useNavigate();
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarquee,setIsMarquee] = useState(false)
  const headerEl = useRef<HTMLDivElement>(null);

  //开启退出动画
  const handleBack = ()=>{
    setShowStatus(false)
  }

  const HEADER_HEIGHT = 45

  const handleScroll = (pos:PosType)=>{
    let minScrollY = -HEADER_HEIGHT
    let percent = Math.abs(pos.y / minScrollY);
    const headerDOM = headerEl.current
    const backButton = Array.from(
      (headerEl.current as HTMLDivElement).children
    )[0];

    //当顶部高度开始变化时
    if(pos.y<minScrollY){
      (headerDOM as HTMLDivElement).style.backgroundColor = commonStyle["theme-color"];
      (headerDOM as HTMLDivElement).style.opacity = Math.min(
        1,
        (percent - 1) / 2
      ).toString();

      //对返回也做一下渐变处理 用来盖住滚动标题
      (backButton as HTMLDivElement).style.backgroundColor =
        commonStyle["theme-color"];
      (backButton as HTMLDivElement).style.opacity = Math.min(
        1,
        (percent - 1) / 2
      ).toString();
      setTitle(currentAlbum.name)
      setIsMarquee(true)
    }else{
      (headerDOM as HTMLDivElement).style.backgroundColor = "";
      (headerDOM as HTMLDivElement).style.opacity = '1';

      (backButton as HTMLDivElement).style.backgroundColor = "";
      (backButton as HTMLDivElement).style.opacity = "1";
      setTitle("歌单");
      setIsMarquee(false);
    }
  }

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <Container>
        <AlbumHeader title={title} handleClick={handleBack} isMarquee={isMarquee} ref={headerEl as any}/>
        <Scroll bounceTop={false} onScroll={handleScroll}>
          <div>
            <TopDesc background={currentAlbum.coverImgUrl}>
              <div className="background">
                <div className="filter"></div>
              </div>

              <div className="img_wrapper">
                <div className="decorate"></div>
                <img src={currentAlbum.coverImgUrl} alt="" />

                <div className="play_count">
                  <BsFillPlayFill />
                  <span className="count">
                    {Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万{" "}
                  </span>
                </div>
              </div>

              <div className="desc_wrapper">
                <div className="title">{currentAlbum.name}</div>
                <div className="person">
                  <div className="avatar">
                    <img src={currentAlbum.creator.avatarUrl} alt="" />
                  </div>
                  <div className="name">{currentAlbum.creator.nickname}</div>
                </div>
              </div>
            </TopDesc>

            <Menu>
              <div>
                <BiComment className="iconfont" />
                评论
              </div>
              <div>
                <BiLike className="iconfont" />
                点赞
              </div>
              <div>
                <MdCollections className="iconfont" />
                收藏
              </div>
              <div>
                <IoIosMore className="iconfont" />
                更多
              </div>
            </Menu>

            <SongList showBackground={false}>
              <div className="first_line">
                <div className="play_all">
                  <BsFillPlayFill className="iconfont" />
                  <span>
                    播放全部
                    <span className="sum">
                      (共 {currentAlbum.tracks.length} 首)
                    </span>
                  </span>
                </div>

                <div className="add_list">
                  <MdCollections className="iconfont" />
                  <span> 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
                </div>
              </div>

              <SongItem>
                {currentAlbum.tracks.map((item, index) => {
                  return (
                    <li key={index}>
                      <span className="index">{index + 1}</span>
                      <div className="info">
                        <span>{item.name}</span>
                        <span>
                          {getName(item.ar)} - {item.al.name}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </SongItem>
            </SongList>
          </div>
        </Scroll>
      </Container>
    </CSSTransition>
  );
};

export default React.memo(Album);
