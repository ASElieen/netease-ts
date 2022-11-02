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
  changePullUpLoading,
} from "../../store/slices/singerListSlice";
import { handleMapCategory } from "../../api/utils";
import { mapCategory } from "../../api/categoryData";
import { forceCheck } from "react-lazyload";
import { Outlet } from "react-router-dom";

const Singer = () => {
  const [category, setCategory] = useState("");
  const [alpha, setAlpha] = useState("");
  const dispatch = useAppDispatch();
  const { isLoading, singerList, pullUpLoading,pullDownLoading } = useAppSelector(
    (state) => state.hotSinger
  );

  useEffect(() => {
    dispatch(getHotSingerList());
  }, [dispatch]);

  //处理顶部歌手分类
  const handleCategory = (value: string) => {
    setCategory(value);
    sessionStorage.setItem("category", value);
    const category = handleMapCategory(
      value,
      mapCategory
    );
    dispatch(getSingerListWithCategory({
      categoryName:category.type as string,
      alpha:alpha,
      area:category.area
    }))
  };

  //处理顶部字母分类
  const handleAlpha = (value: string) => {
    setAlpha(value);
    sessionStorage.setItem('alpha',value)
    const Mapcategory = handleMapCategory(value,mapCategory)
    dispatch(getSingerListWithCategory({
      categoryName:Mapcategory.type,
      alpha:value,
      area:Mapcategory.area
    }))
  };

  //手势上滑 底部刷新 请求更多数据
  const handlePullUp = async ()=>{
    dispatch(addPageCount(10))
    dispatch(changePullUpLoading(true))
    if (sessionStorage.getItem("alpha") || sessionStorage.getItem("category")) {
      const category = handleMapCategory(
        sessionStorage.getItem("category") as string,
        mapCategory
      );
      await dispatch(
        refreshMoreSingersWithCategory({
          categoryName: category.type || '-1',
          alpha: sessionStorage.getItem("alpha") || '',
          area: category.area || -1,
        })
      );
    } else {
      await dispatch(requestMoreHotSingers());
    }
    dispatch(changePullUpLoading(false))
  }

  //手势下拉 顶部刷新 重新加载
  const handlePullDown = ()=>{
    dispatch(clearPageCount())
    if(sessionStorage.getItem('alpha') || sessionStorage.getItem('category')){
      const { type, area } = handleMapCategory(
        sessionStorage.getItem("category") as string,
        mapCategory
      )
      dispatch(getSingerListWithCategory({
        categoryName:type || '-1',
        alpha:sessionStorage.getItem('alpha') || '',
        area:area || -1
      }))
    }else{
      dispatch(getHotSingerList())
    }
  }

  //--------------------变量处理TSX--------------------------
  const ScrollTitle = (
    <>
      <NavContainer>
        <HorizenItem
          list={categoryTypes}
          title={"分类 (热门):"}
          oldVal={sessionStorage.getItem("category") || category}
          handleClick={(value) => handleCategory(value)}
        ></HorizenItem>
        <HorizenItem
          list={alphaTypes}
          title={"首字母:"}
          oldVal={sessionStorage.getItem("alpha") || alpha}
          handleClick={(value) => handleAlpha(value)}
        ></HorizenItem>
      </NavContainer>
    </>
  );
  //-------------------------------------------------------

  if (isLoading) {
    return (
      <>
        {ScrollTitle}
        <ListContainer>
          <WaveLoading margin="100px" />
        </ListContainer>
      </>
    );
  } else {
    return (
      <>
        {ScrollTitle}
        <ListContainer>
          <Scroll
            pullUpLoading={pullUpLoading}
            pullDownLoading={pullDownLoading}
            pullUp={handlePullUp}
            pullDown={handlePullDown}
            onScroll={forceCheck}
          >
            <RenderSingerList singerList={singerList} />
          </Scroll>
        </ListContainer>
        <Outlet/>
      </>
    );
  }
};

export default React.memo(Singer);
