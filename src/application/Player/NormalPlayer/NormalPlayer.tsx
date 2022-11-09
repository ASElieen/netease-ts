import React, { useRef } from "react";
import { useAppDispatch } from "src/api/customHooks";
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  ProgressWrapper,
} from "./normalStyle";
import { CSSTransition } from "react-transition-group";
import animations from "create-keyframe-animation";
import { MdReplay } from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
import { FaRandom } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { BsMusicNoteList, BsFillPlayFill } from "react-icons/bs";
import { ParamProps } from "../MiniPlayer/MiniPlayer";
import { getName, prefixStyle,formatPlayTime } from "src/api/utils";
import NormalProgress from "src/BaseUI/NormalProgress/NormalProgress";

interface NormalPlayerProps extends ParamProps {
  duration: number; //总时长
  currentTime: number; //当前时间
  onProgressChange: (curPercent: number) => void; //控制条状进度条
  handlePrev: () => void;
  handleNext: () => void;
}

const NormalPlayer: React.FC<NormalPlayerProps> = (props) => {
  const {
    song,
    changeFullScreen,
    fullScreen,
    clickToControlPlaying,
    playing,
    duration,
    currentTime,
    percent,
    onProgressChange,
    handleNext,
    handlePrev
  } = props;
  const dispatch = useAppDispatch();
  const normalPlayerRef = useRef<HTMLDivElement>(null);
  const cdWrapperRef = useRef(null);
  const transform = prefixStyle("transform");

  //计算偏移量
  const getPosAndScale = () => {
    const targetWidth = 40; //小CD总宽
    const paddingLeft = 40; //小CD的paddingleft20+小CD半径20 小CDx坐标
    const paddingBottom = 30; //小CD在底部mini中居中 所以取mini的1/2高度就是小圆心y坐标
    const paddingTop = 80; //顶部到大CD圆心的上半区高度
    const width = window.innerWidth * 0.8; //窗口文文档显示区总宽*80% 也就是大CD的总宽
    const scale = targetWidth / width;

    //normalCD的圆心和miniCD的圆心横纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    return {
      x,
      y,
      scale,
    };
  };

  //启用帧动画
  const enter = () => {
    if (normalPlayerRef.current)
      normalPlayerRef.current.style.display = "block";
    const { x, y, scale } = getPosAndScale();
    let animation = {
      0: {
        transform: `translate3d(${x} px,${y} px,0) scale(${scale})`,
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`,
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`,
      },
    };

    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear",
      },
    });
    if (cdWrapperRef.current)
      animations.runAnimation(cdWrapperRef.current, "move");
  };

  //解绑帧动画
  const afterEnter = () => {
    const cdWrapperDOM = cdWrapperRef.current;
    animations.unregisterAnimation("move");
    if (cdWrapperDOM) (cdWrapperDOM as HTMLDivElement).style.animation = "";
  };

  //离开组件的动画
  const leave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    (cdWrapperDom as HTMLDivElement).style.transition = "all 0.4s";
    const { x, y, scale } = getPosAndScale();
    (cdWrapperDom as HTMLDivElement).style[
      transform as string
    ] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  };

  const afterLeave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    (cdWrapperDom as HTMLDivElement).style.transition = "";
    (cdWrapperDom as HTMLDivElement).style[transform as string] = "";
    //现在要把 normalPlayer 这个 DOM 给隐藏掉，CSSTransition只是把动画执行一遍
    // 不置为 none 现在全屏播放器页面还是存在
    if (normalPlayerRef.current) normalPlayerRef.current.style.display = "none";
  };

  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={400}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
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
          <div
            className="back"
            onClick={() => dispatch(changeFullScreen(false))}
          >
            <IoMdArrowBack className="iconfont" />
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>

        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className="cd">
              <img
                className={`image play ${playing ? "" : "pause"}`}
                src={song.al.picUrl + "?param=400x400"}
                alt=""
              />
            </div>
          </CDWrapper>
        </Middle>

        <Bottom className="bottom">
          <ProgressWrapper>
            <span className="time time-l">{formatPlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <NormalProgress
                percent={percent}
                percentChange={onProgressChange}
              ></NormalProgress>
            </div>
            <div className="time time-r">{formatPlayTime(duration)}</div>
          </ProgressWrapper>

          <Operators>
            <div className="icon i-left">
              <BiRefresh className="iconfont" />
            </div>

            <div className="icon i-left" onClick={handlePrev}>
              <IoPlaySkipBack className="iconfont" />
            </div>

            <div className="icon i-center">
              {playing ? (
                <AiOutlinePauseCircle
                  className="iconfont"
                  onClick={(e) => clickToControlPlaying(e, !playing)}
                />
              ) : (
                <BsFillPlayFill
                  className="iconfont"
                  onClick={(e) => clickToControlPlaying(e, !playing)}
                />
              )}
            </div>

            <div className="icon i-right" onClick={handleNext}>
              <IoPlaySkipForward className="iconfont" />
            </div>

            <div className="icon i-right">
              <BsMusicNoteList className="iconfont" />
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
};

export default React.memo(NormalPlayer);
