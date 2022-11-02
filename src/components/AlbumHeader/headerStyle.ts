import styled from "styled-components";
import commonStyle from "../../assets/globalStyle";

export const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px 5px 0;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${commonStyle["font-color-light"]};
  .svg_container {
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    .back {
      font-size: 20px;
      width: 20px;
    }
  }
  .marquee {
    width: 80%;
    height: 35%;
    position: relative;
    animation: marquee 10s linear infinite;
    @keyframes marquee {
      from {
        left: 100%;
      }
      to {
        left: -100%;
      }
    }
    h1 {
      font-size: ${commonStyle["font-size-ll"]};
      font-weight: 700;
    }
  }
  > h1 {
    font-size: ${commonStyle["font-size-ll"]};
    font-weight: 700;
  }
`;