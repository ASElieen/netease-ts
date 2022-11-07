import React from "react";
import { CircleWrapper } from "./circleStyle";

interface ParamProps {
  radius: number;
  percent: number;
  children?:React.ReactNode
}

const CircleProgress: React.FC<ParamProps> = (props) => {
  const { radius, percent,children } = props;
  //整个背景周长
  const dashArray = Math.PI * 100;

  //背景未高亮部分
  const dashOffset = (1 - percent) * dashArray;

  return (
    <CircleWrapper>
      <svg
        width={radius}
        height={radius}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="progress-background"
          r={50}
          cx={50}
          cy={50}
          fill="transparent"
        ></circle>
        <circle
          className="progress-bar"
          r={50}
          cx={50}
          cy={50}
          fill="transparent"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        ></circle>
      </svg>
      {children}
    </CircleWrapper>
  );
};

export default React.memo(CircleProgress);