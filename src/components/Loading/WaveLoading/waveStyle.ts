import styled, { keyframes } from "styled-components";
import commonStyle from "../../../assets/globalStyle";

const waveAnimation = keyframes`
0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

export const Wave = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${(props:{margin:string}) => props.margin? props.margin: "0"};
  .wave {
    width: 2px;
    height: 30px;
    /* background: linear-gradient(45deg, cyan, #fff); */
    background: ${commonStyle["theme-color"]};
    margin: 5px;
    border-radius: 5px;
    animation: 1s ${waveAnimation} linear infinite;
  }
  .wave:nth-child(2) {
    animation-delay: 0.1s;
  }
  .wave:nth-child(3) {
    animation-delay: 0.2s;
  }
  .wave:nth-child(4) {
    animation-delay: 0.3s;
  }
  .wave:nth-child(5) {
    animation-delay: 0.4s;
  }
  .wave:nth-child(6) {
    animation-delay: 0.5s;
  }
  .wave:nth-child(7) {
    animation-delay: 0.6s;
  }
  .wave:nth-child(8) {
    animation-delay: 0.7s;
  }
  .wave:nth-child(9) {
    animation-delay: 0.8s;
  }
  .wave:nth-child(10) {
    animation-delay: 0.9s;
  }
`;
