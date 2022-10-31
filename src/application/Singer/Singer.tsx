import React, { useEffect, useState } from "react";
import HorizenItem from "../../BaseUI/HorizenItem/HorizenItem";
import {
  NavContainer,
  ListContainer,
} from "../../BaseUI/HorizenItem/horizenStyle";
import { categoryTypes, alphaTypes } from "../../api/mock";
import Scroll from "../../components/Scroll/Scroll";
import WaveLoading from "../../components/Loading/WaveLoading/WaveLoading";
import RenderSingerList from "../../components/RenderSingerList/RenderSingerList";
import { useAppDispatch, useAppSelector } from "../../api/customHooks";
import {
  getHotSingerList,
  getSingerListWithCategory,
  refreshMoreSingersWithCategory,
  requestMoreHotSingers,
  addPageCount,
  clearPageCount,
  changePullUpLoading
} from "../../store/slices/singerListSlice";
import { handleCategory } from "../../api/utils";
import { mapCategory } from "../../api/categoryData";

const Singer = () => {
  const [category, setCategory] = useState("");
  const [alpha, setAlpha] = useState("");
  const dispatch = useAppDispatch();
  const { isLoading, singerList } = useAppSelector((state) => state.hotSinger);

  useEffect(() => {
    dispatch(getHotSingerList());
  }, [dispatch]);

  const handleCategory = (value: string) => {
    setCategory(value);
  };
  const handleAlpha = (value: string) => {
    setAlpha(value);
  };

  //--------------------变量处理TSX--------------------------
  const scrollTitle = (
    <>
      <NavContainer>
        <HorizenItem
          list={categoryTypes}
          title={"分类 (热门):"}
          oldVal={category}
          handleClick={(value) => handleCategory(value)}
        ></HorizenItem>
        <HorizenItem
          list={alphaTypes}
          title={"首字母:"}
          oldVal={alpha}
          handleClick={(value) => handleAlpha(value)}
        ></HorizenItem>
      </NavContainer>
    </>
  );
  //-------------------------------------------------------

  if (isLoading) {
    return (
      <>
        {scrollTitle}
        <ListContainer>
          <WaveLoading margin="100px" />
        </ListContainer>
      </>
    );
  } else {
    return (
      <>
        {scrollTitle}
        <ListContainer>
          <Scroll>
            <RenderSingerList singerList={singerList} />
          </Scroll>
        </ListContainer>
      </>
    );
  }
};

export default React.memo(Singer);
