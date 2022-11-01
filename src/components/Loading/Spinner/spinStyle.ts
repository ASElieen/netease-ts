import styled, { keyframes } from "styled-components";
import commonStyle from "../../../assets/globalStyle";

const spinner = keyframes`
0% {transform:rotate(0deg)}
100% {transform:rotate(360deg)}
`;

export const SVGContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner {
    width: 1.5rem;
    height: 1.5rem;
    border-top-color: ${commonStyle["theme-color"]};
    border-left-color: ${commonStyle["theme-color"]};

    animation: ${spinner} 0.5s linear infinite;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-style: solid;
    border-width: 2px;
    border-radius: 50%;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
  }
`;
