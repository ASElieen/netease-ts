import styled,{keyframes} from "styled-components";

const skeletonLoading = keyframes`
  to {
    background-position-x: -20%;
  }
`;

export const Container = styled.div`
  display: flex;
  width: 94%;
  height: 100px;
  margin: 0 auto 5px;
  padding: 3%;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  background-color: white;
  .img_wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    justify-content: flex-start;
    align-items: center;
    width: 30%;
    height: 100%;
    background-color: #ededed;
    border-radius: 8px;
  }
  .loading {
    background-color: #ededed;
    background: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0) 40%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 60%
      ),
      #ededed;
    background-size: 200% 100%;
    background-position-x: 160%;
    animation: 2s ${skeletonLoading} ease-in-out infinite;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 70%;
  height: 100%;
  margin-left: 2rem;
  .top {
    width: 90%;
    height: 15%;
    background-color: #ededed;
    border-radius: 6px;
  }
  .bottom {
    width: 50%;
    height: 15%;
    background-color: #ededed;
    border-radius: 6px;
  }
  .loading {
    background-color: #ededed;
    background: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0) 40%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 60%
      ),
      #ededed;
    background-size: 200% 100%;
    background-position-x: 160%;
    animation: 2s ${skeletonLoading} ease-in-out infinite;
  }
`;


