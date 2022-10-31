import styled from "styled-components";
import commonStyle from "../../assets/globalStyle";

export const NavContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`;

export const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${commonStyle["font-size-m"]};
  }
`;

export const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${commonStyle["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${commonStyle["theme-color"]};
    border: 1px solid ${commonStyle["theme-color"]};
    opacity: 0.8;
  }
`;

export const ListContainer = styled.div`
  position: fixed;
  top: 160px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
`;