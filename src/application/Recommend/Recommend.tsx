import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../api/customHooks";
import Slider from "../../components/Slider/Slider";
import RecommendList from "../../components/RecommendList/RecommendList";
import Scroll from "../../components/Scroll/Scroll";
import { Content } from "./recommendStyle";
import { getBannerImgs } from "../../store/slices/bannerSlice";
import { getRecommendList } from "../../store/slices/recommendListSlice";
import { forceCheck } from "react-lazyload";

export const Recommend = () => {
  const dispatch = useAppDispatch();
  const { bannerImg } = useAppSelector((state) => state.banner);
  const { recommendList } = useAppSelector((state) => state.recommend);

  useEffect(() => {
    if (!bannerImg.length) {
      dispatch(getBannerImgs());
    }
  }, [bannerImg.length, dispatch]);

  useEffect(() => {
    if (!recommendList.length) {
      dispatch(getRecommendList());
    }
  }, [dispatch, recommendList.length]);

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerImg} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
    </Content>
  );
};

export default React.memo(Recommend);
