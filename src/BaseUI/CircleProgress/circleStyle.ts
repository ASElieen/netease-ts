import styled from "styled-components";
import commonStyle from "src/assets/globalStyle";

export const CircleWrapper = styled.div`
  position: relative;
  circle {
    //当前对象轮廓宽度
    stroke-width: 8px;
    transform-origin: center;
    //后方背景
    &.progress-background {
      transform: scale(0.9);
      stroke: rgba(212, 68, 57, 0.5);
    }
    //前方进度展示
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: ${commonStyle["theme-color"]};
    }
  }
`;