import React, { useEffect, useState, useRef } from "react";
import { ProgressWrapper } from "./normalStyle";

interface NormalPlayerProps {
  percent: number;
}

const NormalProgress: React.FC<NormalPlayerProps> = (props) => {
  const { percent } = props;

  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBtnRef = useRef<HTMLDivElement>(null);
  const [touch, setTouch] = useState({initiated:false,startX:0,left:0});

  const progressBtnWidth = 16;

  //处理进度条的偏移
  const handleOffset = (offsetWidth:number)=>{
    (progressRef.current as HTMLDivElement).style.width = `${offsetWidth}px`;
    (
      progressBtnRef.current as HTMLDivElement
    ).style.transform = `translate3d(${offsetWidth}px,0,0)`;
  }

  const progressTouchStart = (e: React.TouchEvent) => {
    const startTouch = {
      initiated: false,
      startX: 0,
      left: 0,
    };
    startTouch.initiated = true; //T表示滑动动作开始
    startTouch.startX = e.touches[0].pageX; //滑动开始时横向坐标
    if (progressRef.current) startTouch.left = progressRef.current.clientWidth; //当前Progress长度
    setTouch(startTouch)
  };

  const progressTouchMove = (e:React.TouchEvent)=>{
    if(!touch.initiated) return
    //滑动距离
    const deltaX = e.touches[0].pageX - touch.startX
    const barWidth = (progressBarRef.current as HTMLDivElement).clientWidth - progressBtnWidth
    const offsetWidth = Math.min(Math.max(0,touch.left+deltaX),barWidth)
    handleOffset(offsetWidth)
  }

  const progressTouchEnd = ()=>{
    const endTouch = JSON.parse(JSON.stringify(touch))
    endTouch.initiated = false
    setTouch(endTouch)
  }

  const progressClick = (e:any)=>{
    // 返回DOMRect矩形集合(left,bottom......)
    const rect = (
      progressBarRef.current as HTMLDivElement
    ).getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    handleOffset(offsetWidth);
  }

  return (
    <ProgressWrapper>
      <div className="bar-inner" ref={progressBarRef} onClick={progressClick}>
        <div className="progress" ref={progressRef}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtnRef}
          onTouchStart={progressTouchStart}
          onTouchEnd={progressTouchEnd}
          onTouchMove={progressTouchMove}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressWrapper>
  );
};

export default React.memo(NormalProgress);
