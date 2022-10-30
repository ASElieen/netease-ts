import React from 'react'
import { getCount } from '../../api/utils'
import {List,ListItem,ListWrapper} from './liststyle'
import { BsFillPlayFill } from "react-icons/bs";

type recommendData = {
    id: number;
    picUrl: string;
    playCount: number;
    name: string;
};

interface recommendProps {
  recommendList: Array<recommendData>;
}


const RecommendList:React.FC<recommendProps> = (props) => {
  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {props.recommendList.map((item:recommendData, index: number) => {
          return (
            <ListItem key={item.id + index}>
              <div className="img_wrapper">
                <div className="decorate"></div>
                {/* 加此参数可以减小请求的图片资源大小 */}
                <img
                  src={item.picUrl + "?param=300x300"}
                  width="100%"
                  height="100%"
                  alt="music"
                />
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
};

export default React.memo(RecommendList);