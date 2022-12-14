import React, { useEffect, useState, useRef } from "react";
import { prefixStyle } from "src/api/utils";
import { ProgressWrapper } from "./normalStyle";

interface NormalPlayerProps {
  percent: number;
  percentChange: (currentPercent: number) => void;
}

const NormalProgress: React.FC<NormalPlayerProps> = (props) => {
  const { percent, percentChange } = props;

  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBtnRef = useRef<HTMLDivElement>(null);
  const [touch, setTouch] = useState({ initiated: false, startX: 0, left: 0 });

  const progressBtnWidth = 16;

  const transform = prefixStyle("transform");

  //监听percent
  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth =
        (progressBarRef.current as HTMLDivElement).clientWidth -
        progressBtnWidth;

      const offsetWidth = percent * barWidth;
      (progressRef.current as HTMLDivElement).style.width = `${offsetWidth}px`;

      (progressBtnRef.current as HTMLDivElement).style[
        transform as string
      ] = `translate3d(${offsetWidth}px, 0, 0)`;
    }
  },[percent]);

  //处理进度条的偏移
  const handleOffset = (offsetWidth: number) => {
    (progressRef.current as HTMLDivElement).style.width = `${offsetWidth}px`;
    (
      progressBtnRef.current as HTMLDivElement
    ).style.transform = `translate3d(${offsetWidth}px,0,0)`;
  };

  //处理父组件传来的数据
  const changePercent = () => {
    const barWidth =
      (progressBarRef.current as HTMLDivElement).clientWidth - progressBtnWidth;
    const currentPercent =
      (progressRef.current as HTMLDivElement).clientWidth / barWidth;
    percentChange(currentPercent); //把新进度传给回调函数
  };

  const progressTouchStart = (e: React.TouchEvent) => {
    const startTouch = {
      initiated: false,
      startX: 0,
      left: 0,
    };
    startTouch.initiated = true; //T表示滑动动作开始
    startTouch.startX = e.touches[0].pageX; //滑动开始时横向坐标
    if (progressRef.current) startTouch.left = progressRef.current.clientWidth; //当前Progress长度
    setTouch(startTouch);
  };

  const progressTouchMove = (e: React.TouchEvent) => {
    if (!touch.initiated) return;
    //滑动距离
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth =
      (progressBarRef.current as HTMLDivElement).clientWidth - progressBtnWidth;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    handleOffset(offsetWidth);
  };

  const progressTouchEnd = () => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initiated = false;
    setTouch(endTouch);
    changePercent();
  };

  const progressClick = (e: any) => {
    // 返回DOMRect矩形集合(left,bottom......)
    const rect = (
      progressBarRef.current as HTMLDivElement
    ).getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    handleOffset(offsetWidth);
    changePercent();
  };

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
