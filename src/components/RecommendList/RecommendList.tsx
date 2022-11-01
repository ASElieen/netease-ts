import React from "react";
import { useAppSelector } from "../../api/customHooks";
import WaveLoading from "../Loading/WaveLoading/WaveLoading";
import { getCount } from "../../api/utils";
import LazyLoad from "react-lazyload";
import { List, ListItem, ListWrapper } from "./liststyle";
import { BsFillPlayFill } from "react-icons/bs";
import music from "../../assets/music.png";

export type RecommendData = {
  id: number;
  picUrl: string;
  playCount: number;
  name: string;
};

interface RecommendProps {
  recommendList: Array<RecommendData>;
}

const RecommendList: React.FC<RecommendProps> = (props) => {
  const {isLoading} = useAppSelector((state)=>state.recommend)
  if(isLoading){
    return (
      <ListWrapper>
        <h1 className="title"> 推荐歌单 </h1>
        <WaveLoading margin="50px"/>
      </ListWrapper>
    );
  }else{
    return (
      <ListWrapper>
        <h1 className="title"> 推荐歌单 </h1>
        <List>
          {props.recommendList.map((item: RecommendData) => {
            return (
              <ListItem key={item.id + item.playCount}>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  {/* 加此参数可以减小请求的图片资源大小 */}

                  <LazyLoad
                    placeholder={
                      <img width="100%" height="100%" src={music} alt="music" />
                    }
                  >
                    <img
                      src={item.picUrl + "?param=300x300"}
                      width="100%"
                      height="100%"
                      alt="music"
                    />
                  </LazyLoad>

                  <div className="play_count">
                    <div className="play_container">
                      <BsFillPlayFill />
                      <span className="count">{getCount(item.playCount)}</span>
                    </div>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </ListItem>
            );
          })}
        </List>
      </ListWrapper>
    );
  }
};

export default React.memo(RecommendList);
