import styled from "styled-components";
import commonStyle from "../../assets/globalStyle";

export const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin: 10px 0 10px 10px;
    color: ${commonStyle["font-color-desc"]};
    font-size: ${commonStyle["font-size-s"]};
  }
`;

export const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  align-items: center;
  border-bottom: 1px solid ${commonStyle["border-color"]};
  .img_wrapper {
    margin-right: 20px;
    img {
      border-radius: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name {
    font-size: ${commonStyle["font-size-m"]};
    color: ${commonStyle["font-color-desc"]};
    font-weight: 500;
  }
`;