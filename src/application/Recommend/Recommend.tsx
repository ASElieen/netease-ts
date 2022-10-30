import React,{useEffect} from "react";
import { useAppDispatch,useAppSelector } from "../../api/customHooks";
import Slider from "../../components/Slider/Slider";
import RecommendList from "../../components/RecommendList/RecommendList";
import Scroll from "../../components/Scroll/Scroll";
import { Content } from "./recommendStyle";
import {getBannerImgs} from '../../store/slices/bannerSlice'

export const Recommend = () => {
  const dispatch = useAppDispatch()
  const {bannerImg,isLoading} = useAppSelector((state)=>state.banner)
  useEffect(()=>{
    if (!bannerImg.length) {
      dispatch(getBannerImgs());
    }
  },[])

  const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
    return {
      id: 1,
      picUrl:
        "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
      playCount: 17171122,
      name: "朴树、许巍、李健、郑钧、老狼、赵雷",
    };
  });

  if(isLoading){
    return (
      <div>loading...</div>
    )
  }else{
    return (
      <Content>
        <Scroll className="list">
          <div>
            <Slider bannerList={bannerImg} />
            <RecommendList recommendList={recommendList} />
          </div>
        </Scroll>
      </Content>
    );
  }
};

export default React.memo(Recommend);
